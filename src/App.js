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

	componentDidUpdate(prevProps) {
		if (
			prevProps.lhs !== this.props.lhs ||
			prevProps.rule !== this.props.rule
		) {
			this.handleOperation(prevProps.rule);
		}
	}

	handleOperation = (prev) => {
		if (this.props.rule === "AC") {
			this.setState({
				result: 0,
			});
		} else if (prev === "=") {
			this.setState({
				result: this.state.result,
			});
		} else if (prev === " " || prev === "AC") {
			this.setState({
				result: this.props.lhs,
			});
		} else if (prev === "+") {
			console.log(15 / 5);
			this.setState({
				result: this.state.result + this.props.lhs + this.props.rhs,
			});
		} else if (prev === "*") {
			this.setState({
				result: this.state.result * this.props.lhs * this.props.rhs,
			});
		} else if (prev === "-") {
			this.setState({
				result: this.state.result - this.props.lhs - this.props.rhs,
			});
		} else if (prev === "/") {
			this.setState({
				result: this.state.result / this.props.lhs / this.props.rhs,
			});
		} else {
		}
	};

	render() {
		if (this.props.rule === "=") {
			return <p>{this.state.result}</p>;
		} else {
			return <p>{this.props.disp[this.props.disp.length - 1]}</p>;
		}
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let digits;
		digits = digitArr.map((dig) => {
			return (
				<Digit
					getter={this.props.get}
					digit={dig}
					currDisp={this.props.curr}
					opr={this.props.op}
				/>
			);
		});

		return <div className="calc">{digits}</div>;
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 0,
			value: " ",
			display: " ",
			operation: " ",
			right: 0,
		};
	}

	getInput = (input) => {
		this.updateDisplay(input);
		this.handleInput(input);
	};

	handleInput = (input) => {
		let temp;
		if (input === "=" && this.state.value) {
			temp = parseFloat(this.state.value);
			this.setState({
				right: temp,
				left:
					this.state.operation === "+" || this.state.operation === "-"
						? 0
						: 1,
				value: " ",
				operation: input,
			});
		} else if (input === "AC") {
			this.clearDisplay();
			this.setState({
				operation: input,
			});
		} else if (!Number.isInteger(input) && input !== ".") {
			if (this.state.value !== " ") {
				temp = parseFloat(this.state.value);
				this.setState({
					left: temp,
					value: " ",
					right: input === "+" ? 0 : 1,
				});
			}
			this.setState({
				operation: input,
			});
		} else {
			temp = this.state.value.toString() + input.toString();
			this.setState({
				value: temp,
			});
		}
	};

	updateDisplay = (val) => {
		let temp = this.state.display;

		if (this.state.operation === "=" && Number.isInteger(val)) {
			this.setState({ display: val.toString() });
		} else {
			if (
				(!Number.isInteger(val) &&
					temp.indexOf(val) !== temp.length - 1) ||
				Number.isInteger(val)
			) {
				let store = this.state.display.toString() + val.toString();
				this.setState({
					display: store,
				});
			}
		}
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
				<Operations
					lhs={this.state.left}
					rhs={this.state.right}
					rule={this.state.operation}
					dispFunc={this.updateDisplay}
					disp={this.state.display}
				/>
				<Calculator get={this.getInput} />
			</div>
		);
	}
}

export default App;
