import React from "react";
import * as d3 from "d3";

class LineChart extends React.Component {

	margins = { top: 10, right: 30, bottom: 30, left: 50 };
	height = 200 - this.margins.top - this.margins.bottom;
	width = 700 - this.margins.left - this.margins.right;

	x_scale = d3.scaleTime().range([0, this.width]);
	y_scale = d3.scaleLinear().range([this.height, this.margins.bottom]);
	x_axis = d3.axisBottom(this.x_scale).ticks(7);
	y_axis = d3.axisLeft(this.y_scale).ticks(4);

	zoomed = () => {
			const x_rescaled = d3.event.transform.rescaleX(this.x_scale);
			// Здесь нужно выбирать текущий график, напр. по id.
			// Иначе выбирается первый .line_chart, а не тот, что под курсором.
			d3.select(".line_chart").attr("d", this.line(x_rescaled));
			d3.select(".xAxis").call(this.x_axis.scale(x_rescaled));
		}

	zoom = d3.zoom()
			.extent([[this.margins.left, 0], [this.width - this.margins.right, this.height]])
			.scaleExtent([1, 32])
			// Фиксирует min/max на заданном диапазоне. 
			.translateExtent([[this.margins.left, this.margins.top], [this.width - this.margins.right,
			this.margins.bottom]])
			.on("zoom", this.zoomed);

	line = x_scale => d3.line()
			.x(d => x_scale(new Date(d.t)) )
			.y(d => this.y_scale(+d.a))
			.curve(d3.curveMonotoneX);

	draw_chart = datum => {
		const data = datum["d"];
		const chart_key = `chart-${datum["k"]}`;
		data.sort((a, b) => new Date(a.t) - new Date(b.t))

		this.x_scale.domain(d3.extent(data.map(d => new Date(d.t))));
		// Предусмотреть [min, max] для отрицательных значений
		this.y_scale.domain([0, d3.max(data, d => +d.a)]);

		d3.select(`#${chart_key} .xAxis`)
			.call(this.x_axis);
		d3.select(`#${chart_key} .yAxis`)
			.call(this.y_axis);
		d3.select(`#${chart_key} .line`)
			.append("path")
			.attr("class", "line_chart")
			.datum(data)
			.attr("d", this.line(this.x_scale));
			
		d3.select(`#${chart_key} svg`).call(this.zoom);
	}

	componentDidMount() {
		this.draw_chart(this.props.data)
	}

	render() {
		const chart_key = this.props.data["k"];
		return (
			<svg key={this.props.data["k"]} id={`chart-${chart_key}`}
				preserveAspectRatio="xMidYMid meet"
				width={"100%"} height={this.height + this.margins.top + this.margins.bottom}>
				<g className="line" transform={`translate(${this.margins.left}, 0)`}></g>
				<g className="xAxis" transform={`translate(${this.margins.left}, ${this.height})`}></g>
				<g className="yAxis" transform={`translate(${this.margins.left}, 0)`}></g>
			</svg>
		)
		}
}
export default LineChart;
