import React from "react";
//import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

class Test extends React.Component {
	constructor(props) {
	super(props)
	this.state = {
		isLoaded: false,
		data: {}
	}

}

	componentDidMount() {
		if (!this.state.isLoaded) {
			const data_loaded = {};
			this.props.data.forEach(i => {
				fetch(`/data/${i}.json`)
					.then(response => response.json())
					.then(data => data_loaded[i] = { ...data })
				});
			this.setState({ data: data_loaded, isLoaded: true } );
	}
		
	}
	render() {
		if (this.state.isLoaded) {
			const { data } = this.state;
			console.log(data);
			const graph_data = <div>{ Object.keys(this.state.data).map(k => 
				<div key={k}>"Hello"</div> )}</div>;
			console.log(graph_data);
			return graph_data;

		} else {
			console.log(this.state.isLoaded);
			return "Loading...";
		}
	}

}
export default Test;
