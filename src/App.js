import React from "react";
import logo, { ReactComponent } from "./logo.svg";
import "./App.css";
import { render } from "react-dom";

let digitArr = [
	{ id: "zero", num: 0 },
	{ id: "one", num: 1 },
	{ id: "two", num: 2 },
	{ id: "three", num: 3 },
	{ id: "four", num: 4 },
	{ id: "five", num: 5 },
	{ id: "six", num: 6 },
	{ id: "seven", num: 7 },
	{ id: "eight", num: 8 },
	{ id: "nine", num: 9 },
	{ id: "add", num: "+" },
	{ id: "subtract", num: "-" },
	{ id: "multiply", num: "*" },
	{ id: "divide", num: "/" },
	{ id: "decimal", num: "." },
	{ id: "clear", num: "AC" },
	{ id: "equals", num: "=" },
];

const isOperator = /[*/+‑]/;
const endsWithOperator = /[*+-/]$/;
const endsWithNegativeSign = /\d[*/+-]{1}-$/;
const startsWithOperator = /^[*/]/;

class Digit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styling: { backgroundColor: "green" },
		};
	}

	handleClick = () => {
		this.props.getter(this.props.digit);
	};

	handleHover = () => {
		if (this.state.styling.backgroundColor === "green") {
			this.setState({
				styling: { backgroundColor: "yellowgreen", color: "white" },
			});
		} else {
			this.setState({
				styling: { backgroundColor: "green" },
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<button
					onClick={this.handleClick}
					className="btn"
					id={this.props.id}
					onMouseEnter={this.handleHover}
					style={this.state.styling}
					onMouseLeave={this.handleHover}
				>
					{this.props.digit}
				</button>
			</React.Fragment>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curr: "0",
			value: "",
			result: "",
		};
	}

	handleNumbers = (input) => {
		let store;
		this.setState({
			value:
				this.state.value === ""
					? input.toString()
					: this.state.curr === "0"
					? this.state.value.replace(/0$/, input)
					: this.state.value.toString() + input.toString(),
			curr:
				isOperator.test(this.state.curr) ||
				this.state.curr === "0" ||
				this.state.value === ""
					? input.toString()
					: this.state.curr.toString() + input.toString(),
		});

		store =
			this.state.value === ""
				? input.toString()
				: this.state.curr === "0"
				? this.state.value.replace(/0$/, input)
				: this.state.value.toString() + input.toString();

		this.props.disp(store);
	};

	handleOperation = (input) => {
		let temp = this.state.value.toString();

		if (this.state.result) {
			this.setState({
				value: this.state.curr.toString() + input.toString(),
				curr: input.toString(),
				result: "",
			});
			console.log("hi");
			this.props.disp(this.state.curr.toString() + input.toString());
		} else if (!endsWithOperator.test(this.state.value)) {
			this.props.disp(temp + input.toString());
			this.setState({
				value: this.state.value.toString() + input.toString(),
				curr: input.toString(),
			});
		} else if (!endsWithNegativeSign.test(this.state.value)) {
			if (
				endsWithNegativeSign.test(this.state.value + input.toString())
			) {
				this.setState({
					value: this.state.value.toString() + input.toString(),
					curr: input.toString(),
				});

				this.props.disp(this.state.value.toString() + input.toString());
			} else {
				temp = temp.slice(0, temp.length - 1);

				this.setState({
					value: temp.toString() + input.toString(),
					curr: input.toString(),
				});

				this.props.disp(temp.toString() + input.toString());
			}
		} else {
			if (input !== "-") {
				temp = temp.slice(0, temp.length - 2);
				this.props.disp(temp.toString() + input.toString());
				this.setState({
					value: temp.toString() + input.toString(),
					curr: input.toString(),
				});
			}
		}
	};

	clearDisplay = () => {
		this.setState({
			value: "",
			curr: "0",
		});
		this.props.disp("");
	};

	handleInput = (input) => {
		if (Number.isInteger(input)) {
			this.handleNumbers(input);
		} else if (input === "=") {
			this.handleEvaluate();
		} else if (input === "." && !this.state.curr.includes(".")) {
			this.setState({
				value: this.state.value + input.toString(),
				curr: this.state.curr + input.toString(),
			});

			this.props.disp(this.state.value + input.toString());
		} else if (input === "AC") {
			this.clearDisplay();
		} else if (!Number.isInteger(input) && input !== ".") {
			this.handleOperation(input);
		}
	};

	handleEvaluate = () => {
		if (this.state.value) {
			let val = this.state.value;
			while (endsWithOperator.test(val)) {
				val = val.slice(0, -1);
			}

			while (startsWithOperator.test(val)) {
				val = val.slice(1);
			}

			val = eval(val);
			this.props.disp(this.state.value + "=" + val);
			this.setState({
				result: 1,
				curr: val,
				value: "",
			});
		}
	};

	render() {
		let digits;
		digits = digitArr.map((dig) => {
			return (
				<Digit getter={this.handleInput} digit={dig.num} id={dig.id} />
			);
		});

		return (
			<React.Fragment>
				<p id="display">{this.state.curr}</p>
				<div className="calc">{digits}</div>
			</React.Fragment>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
		};
	}

	updateDisplay = (val) => {
		this.setState({
			input: val,
		});
	};

	render() {
		return (
			<div className="wrapper">
				<div id="input">{this.state.input}</div>
				<Calculator
					disp={this.updateDisplay}
					displ={this.state.input}
				/>
			</div>
		);
	}
}

export default App;
