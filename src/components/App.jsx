import React from "react";
import GameComponent from "./spellCardComponent"

export default class App extends React.Component {
	render() {
		return (
			<div style={{ alignItems:'center' }}>
				<h1>Hello World</h1>
				<GameComponent/>
			</div>
		);
	}
}
