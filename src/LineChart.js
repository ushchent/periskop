const margins = { top: 10, right: 30, bottom: 30, left: 40 };
const height = 200 - margins.top - margins.bottom;
const width = 700 - margins.left - margins.right;

const x_scale = d3.scaleTime().range([0, width]);
const y_scale = d3.scaleLinear().range([height, 0]);
const x_axis = d3.axisBottom(x_scale).ticks(7);
const y_axis = d3.axisLeft(y_scale).ticks(6);

const line  = x_scale => d3.line()
		.x(d => x_scale(new Date(d.date)) )
		.y(d => y_scale(+d.amt) )
		.curve(d3.curveMonotoneX);

const svg = d3.select("#chart")
	.append("svg")
	//.attr("viewbox", [50, 90, 10, 40])
	.attr("width", width + margins.left + margins.right)
	.attr("height", height + margins.top + margins.bottom)

const line_chart = svg.append("g")
        .attr("class", "line")
        .attr("transform", "translate(" + margins.left + ",0)")

const zoom = d3.zoom()
	.extent([[margins.left, 0], [width - margins.right, height]])
	.scaleExtent([1, 8])
	// Фиксирует min/max на заданном диапазоне. 
	.translateExtent([[margins.left, margins.top], [width - margins.right,
	margins.bottom]])
	.on("zoom", zoomed);

function zoomed() {
	const x_rescaled = d3.event.transform.rescaleX(x_scale)
	d3.select(".line_chart").attr("d", line(x_rescaled));
	d3.select(".x.axis").call(x_axis.scale(x_rescaled));
}

d3.csv("test_zoom.csv").then(data => {

	data.sort((a, b) => new Date(a.date) - new Date(b.date))

	x_scale.domain(d3.extent(data.map(d => new Date(d.date))));
	scale_base.domain(d3.extent(data.map(d => new Date(d.date))));
	y_scale.domain(d3.extent(data.map(d => +d.amt)));

	d3.select("svg")
		.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + margins.left + "," + height + ")")
		.call(x_axis);
	d3.select("svg")
		.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margins.left + "," +
			0 + ")")
		.call(y_axis);
	line_chart.append("path")
        .datum(data)
        .attr("class", "line_chart")
        .attr("d", line(x_scale));

svg.call(zoom);

})
