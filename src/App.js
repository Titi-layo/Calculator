import React from "react";
import logo, { ReactComponent } from "./logo.svg";
import "./App.css";
import { render } from "react-dom";

let digitArr = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	"AC",
	"+",
	"-",
	"*",
	"/",
	".",
	"=",
];

class Digit extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		this.props.getter(this.props.digit);
	};

	render() {
		return (
			<div className="digit">
				<button onClick={this.handleClick} className="btn">
					{this.props.digit}
				</button>
			</div>
		);
	}
}

class Operations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: 0,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.lhs !== this.props.lhs) {
			this.handleOperation(prevProps);
		} else {
			if (
				this.props.rule === "=" &&
				prevState.result !== this.state.result
			) {
				this.props.dispFunc(this.state.result);
			}
		}
	}

	handleOperation = (prev) => {
		if (this.props.rule === "AC") {
			this.setState({
				result: 0,
			});
		} else if (prev.rule === "=") {
			this.setState({
				result: this.state.result,
			});
		} else if (prev.rule === " " || prev.rule === "AC") {
			this.setState({
				result: this.props.lhs,
			});
		} else if (prev.rule === "+") {
			this.setState({
				result: this.state.result + this.props.lhs,
			});
		} else if (prev.rule === "*") {
			this.setState({
				result: this.state.result * this.props.lhs,
			});
		} else if (prev.rule === "-") {
			this.setState({
				result: this.state.result - this.props.lhs,
			});
		} else if (prev.rule === "/") {
			this.setState({
				result: this.state.result / this.props.lhs,
			});
		} else {
		}
	};

	render() {
		if (this.props.rule === "=") {
			return <p>{this.state.result}</p>;
		} else {
			return <p></p>;
		}
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 0,
			value: " ",
			operation: " ",
		};
	}

	handleInput = (input) => {
		let temp = this.props.displ.toString();
		if (input === "=" && this.state.value) {
			this.setState({
				left: parseFloat(this.state.value),
				value: 0,
				operation: input,
			});
		} else if (input === "AC") {
			this.setState({
				operation: input,
				value: " ",
			});
			this.props.disp(" ");
		} else if (!Number.isInteger(input) && input !== ".") {
			if (this.state.value !== " ") {
				this.props.disp(this.props.displ.toString() + input.toString());

				this.setState({
					left: parseFloat(this.state.value),
					value: " ",
					operation: input,
				});
			} else {
				if (temp.length > 1) {
					console.log(temp.length);
					temp = temp.slice(0, temp.length - 1);
					this.props.disp(temp + input);
					this.setState({
						operation: input,
					});
				}
			}
		} else {
			if (this.state.value === 0) {
				this.setState({
					value: input.toString(),
					operation: " ",
				});
				this.props.disp(input.toString());
			} else {
				this.setState({
					value: this.state.value.toString() + input.toString(),
				});
				this.props.disp(this.props.displ.toString() + input.toString());
			}
		}
	};

	render() {
		let digits;
		digits = digitArr.map((dig) => {
			return <Digit getter={this.handleInput} digit={dig} />;
		});

		return (
			<React.Fragment>
				<Operations
					lhs={this.state.left}
					rhs={this.state.right}
					rule={this.state.operation}
					dispFunc={this.props.disp}
				/>
				<div className="calc">{digits}</div>
			</React.Fragment>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: " ",
		};
	}

	updateDisplay = (val) => {
		this.setState({
			display: val,
		});
	};

	clearDisplay = () => {
		this.setState({
			left: 0,
			value: " ",
			display: " ",
			operation: " ",
			right: 0,
		});
	};

	render() {
		return (
			<div className="wrapper">
				<div id="display">{this.state.display}</div>
				<Calculator
					disp={this.updateDisplay}
					displ={this.state.display}
				/>
			</div>
		);
	}
}

export default App;
