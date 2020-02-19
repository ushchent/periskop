// Для recharts данные передавать списком
import React from "react";
//import Gallery from "./Gallery";
import Header from "./Header";
import Test from "./Test";
import SearchBox from "./SearchBox";

class Home extends React.Component {
	state = {
		indicators_available: [],
		data: []
	}

componentDidUpdate() {
		if (this.state.data.length === 0) {
				const data_loaded = [];
				this.state.indicators_available.forEach(i => {
					fetch(`/data/${i}.json`)
					.then(response => response.json())
					.then(data_loaded => this.setState({ data: [...this.state.data, data_loaded] } ))
				});
			}
}

	componentDidMount() {
		fetch("/indicators_available.json")
			.then(response => response.json())
			.then(data => this.setState({ indicators_available: data }));


	}


	render() {

		return (
			<React.Fragment>
				<Header />
				<SearchBox />
				<Test data={ this.state.data } />
			</React.Fragment>
		)

	}
}
export default Home;
