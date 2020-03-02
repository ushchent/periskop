import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import Draggable from 'react-draggable';

class Gallery extends React.Component {
	
	render() {
			if (this.props.data.length > 0) {
				return <div className="gallery">{
					this.props.data.map(datum =>
						<Draggable axis="both"
							key={datum["k"]}
							handle=".handle"
							defaultPosition={{x: 0, y: 0}}
							position={null}
							grid={[25, 25]}
							scale={1}
							onStart={this.handleStart}
							onDrag={this.handleDrag}
							onStop={this.handleStop}>
							
							<div>
								
									<h2 className="handle">{datum["t"]}</h2>
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
							</div>
						</Draggable>
						)
				}</div>;
			} else {
				return null;
			}
	}
}

export default Gallery;
