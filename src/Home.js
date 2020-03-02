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

update_indicators_list = event => {
	const selected_indicator = +event.currentTarget.getAttribute("data-key");
	console.log("Running");
	console.log(selected_indicator);
	if (this.state.indicators_available.indexOf(selected_indicator) == -1) {
		this.setState({ indicators_available: [...this.state.indicators_available, selected_indicator]})
	}
}

// Запускаться после каждого обновления состояния 
componentDidUpdate() {
		if (this.state.data.length === 0) {
				this.state.indicators_available.forEach(i => {
					fetch(`https://periskop-c44c7.firebaseio.com/data/${i}.json`)
					.then(response => response.json())
					.then(data_loaded => this.setState({ data: [...this.state.data, data_loaded] } ))
				});
			}
}
	componentDidMount() {

		fetch("https://periskop-c44c7.firebaseio.com/indicators_available.json")
			.then(response => response.json())
			.then(data => this.setState({ indicators_available: data }));
	}
	render() {

		return (
			<React.Fragment>
				<Header />
				<SearchBox update_func={this.update_indicators_list}/>
				<Gallery data={ this.state.data } />
				<Footer />
			</React.Fragment>
		)
	}
}
export default Home;
