import React from "react";
//import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import Draggable from 'react-draggable';
import LineChart from "./LineChart";

class Gallery extends React.Component {

	render() {
			if (this.props.data.length > 0) {
				return <div className="gallery">{
					this.props.data.map(datum =>
						<Draggable axis="both"
							key={`draggable-${datum["k"]}`}
							handle=".handle"
							defaultPosition={{x: 0, y: 0}}
							position={null}
							grid={[15, 15]}
							scale={1}
							onStart={this.handleStart}
							onDrag={this.handleDrag}
							onStop={this.handleStop}>
							<div>
									<h2 key={datum["k"]} className="handle">{datum["t"]}</h2>
									<LineChart key={`chart-${datum["k"]}`} data={datum} />
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
