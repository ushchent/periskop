import React from "react";
//import algolia_logo from "./logo-algolia.png";

class SearchBox extends React.Component {
	state = {
		data_found: null
		}

	request_headers = new Headers({
	  'X-Algolia-API-Key': '01434ca5ac59b159343e9508373599f3',
	  'X-Algolia-Application-Id': "FG1WJNZR1K"
	});

	clean_response = response => {
			const filtered = {};
			response["hits"].forEach( hit => {
				if (filtered[hit["ind"]] === undefined) {
						filtered[hit["ind"]] = hit["title"];
					}
				}
			);
			return filtered;
		}

	get_data = (text) => fetch(`https://FG1WJNZR1K-dsn.algolia.net/1/indexes/periskop?query=${text}`, {
			method: 'GET',
			headers: this.request_headers,
			mode: 'cors',
			cache: 'default'
			})
            .then(response => response.json())
            .then(data => this.clean_response(data))
            .then(data => this.setState({ data_found: data }));

	handle_input = (event) => {
		if (event.target.value.length > 4) {
			document.getElementById("data_found").classList.remove("hidden");
			this.get_data(event.target.value);
		} else if (event.target.value.length === 0) {
			document.getElementById("data_found").classList.add("hidden");
		} else {
			return null;
		}
	}

	output_data = () => {	
			if (this.state.data_found != null) {
				 return (<ul>
					{Object.entries(this.state.data_found).map(
						d => <li key={`id_${d[0]}`} data-key={d[0]}
						onClick={this.props.update_func}>{ d[1] }</li>
					)}
						</ul>)
				}
		}


	hide_found_list = () => {
		if (document.getElementById("search_box").value.length !== 0) {
			document.getElementById("data_found").classList.remove("hidden");
		}
	}

componentDidMount() {
	document.getElementById("search_box").onblur = this.hide_found_list;
}

	render() { 
		return (
		<React.Fragment>
			<input id="search_box"
				type="text"
				className="search"
				placeholder="Искать показатель"
				onChange={ this.handle_input }
			/>
			<div id="data_found" className="hidden">
				{ this.output_data() }
			</div>
		</React.Fragment>
		)
	}

}

export default SearchBox;
