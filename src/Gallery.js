import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

class Test extends React.Component {
	constructor(props) {
	super(props)
	this.state = {
		data: null
	}
}
	componentDidUpdate() {
		if (this.props.data && this.state.data === null) {
			const data_loaded = {};
			this.props.data.forEach(i => {
				fetch(`/data/${i}.json`)
					.then(response => response.json())
					.then(data => data_loaded[i] = { ...data })
				});
			this.setState({ data: data_loaded } );
	}
		
	}
	render() {
		console.log("Test state is: ", this.state.data);
		const indicators = [...this.props.data];
		console.log(indicators);
		return (
			<div className="gallery">
				{ indicators.map( item =>
					<div className="grafik" key={`ind_${item}`}>{ item }</div>
					)
				}
			</div>
		)
	}

}
export default Test;
