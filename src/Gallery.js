import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const Test = props => {
			if (props.data.length > 0) {
				return <div className="gallery">{
					props.data.map(datum => <div key={datum["k"]}>
					<h2>{datum["t"]}</h2>
					<ResponsiveContainer width="95%" height={200}>
					<LineChart data={datum["d"]} margin={{
						top: 5, right: 30, left: 20, bottom: 5,
        }}>
					    <XAxis dataKey="t" interval="preserveEnd"/>
						<YAxis/>
						<Tooltip labelFormatter={() => `${datum["l"]}`}/>
						
						<CartesianGrid stroke="#eee" strokeDasharray="2 2"/>
						<Line type="monotone" dataKey="a" stroke="#8884d8" />
					</LineChart>
					</ResponsiveContainer>
						</div>)
				}</div>;
			} else {
				return null;
			}
	}

export default Test;
