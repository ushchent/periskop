// Для recharts данные передавать списком
import React from "react";
//import Gallery from "./Gallery";
import Test from "./Test";

class Home extends React.Component {
	state = {
		indicators_available: []
	}
	componentDidMount() {
		fetch("/indicators_available.json")
			.then(response => response.json())
			.then(data => this.setState({ indicators_available: data }))
	}
	
	render() {
		return (
			<main>
				<Test data={ this.state.indicators_available } />	
			</main>
		)
	}
}

export default Home;
