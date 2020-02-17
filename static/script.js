// Описание для создания скруток https://github.com/plotly/plotly.js/
// Получаем данные в csv

var categories_map = {
	1: "Демография",
	2: "Промышленность",
	3: "Государство",
	4: "Финансы"
	}

function create_menu(categories) {
	Plotly.d3.select("#menu")
		.selectAll("div")
		.data(categories)
		.enter()
		.append("div")
		.text(d => categories_map[d]);
}

Plotly.d3.csv("data.csv", function(err, rows){
	rows.forEach(function(d, i) {
		//rows[i]["date"] = new Date(d["date"]);
		rows[i]["amt"] = parseFloat(d["amt"]) 
	})
	console.log(rows);
	create_menu(Object.keys(categories_map));
	let data = {
		x: rows.filter(d => d.cat == 3).map(d => d.date),
		y: rows.map(d => d.amt),
		type: "scatter",
		fill: "tozeroy"
		//mode: "lines+markers"
	}
	console.log(data);
	console.log(Plotly.d3.max(data["y"]));
var layout = {
	  xaxis: {
		      type: 'date',
		      title: "Динамика по годам"
		    },
	  yaxis: {
		  	  range: [0, Plotly.d3.max(data["y"])],
		      title: 'BYN млн'
		    },
	  title:'Государственный долг Республики Беларусь'
};
	Plotly.newPlot("chart1", [data], layout);
	Plotly.newPlot("chart2", [data], layout);

});

var trace3 = {
	        x: [1, 2, 3, 4],
	        y: [12, 9, 15, 12],
	        // mode: 'lines+markers',
	        type: 'scatter'
	      };

//var data = [trace1, trace2, trace3];

//Plotly.newPlot("chart1", [trace1]);
//Plotly.newPlot("chart2", [trace2]);
//Plotly.newPlot("chart3", [trace3]);
