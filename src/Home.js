// Для recharts данные передавать списком
import React from "react";
import Gallery from "./Gallery";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Footer from "./Footer";

class Home extends React.Component {
	state = {
		indicators_available: [],
		data: []
	}

componentDidUpdate() {
		if (this.state.data.length === 0) {
				const data_loaded = [];
				this.state.indicators_available.forEach(i => {
					fetch(`https://periskop-c44c7.firebaseio.com/data/${i}.json`)
					.then(response => response.json())
					.then(data_loaded => this.setState({ data: [...this.state.data, data_loaded] } ))
				});
			}
}
	componentDidMount() {

		fetch("https://periskop-c44c7.firebaseio.com//indicators_available.json")
			.then(response => response.json())
			.then(data => this.setState({ indicators_available: data }));
	}
	render() {

		return (
			<React.Fragment>
				<Header />
				<SearchBox />
				<Gallery data={ this.state.data } />
				<Footer />
			</React.Fragment>
		)
	}
}
export default Home;
