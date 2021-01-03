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

class Operations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: 0,
		};
	}
	//|| prevProps.operation !== this.props.operation
	componentDidUpdate(prevProps, prevState) {
		console.log("byeee");
		if (prevProps.lhs !== this.props.lhs) {
			this.handleOperation(prevProps);
		} else {
			if (
				this.props.rule === "=" &&
				prevState.result !== this.state.result
			) {
				this.props.dispFunc(this.state.result.toString());
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
		} else if (prev.rule === "" || prev.rule === "AC") {
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
			value: "",
			operation: "",
		};
	}

	handleInput = (input) => {
		let temp = this.props.displ.toString();
		if (input === "=" && this.state.value !== "") {
			this.setState({
				left: parseFloat(this.state.value),
				value: 0,
				operation: input,
			});
		} else if (input === "AC") {
			this.setState({
				operation: input,
				value: "",
			});
			this.props.disp(0);
		} else if (!Number.isInteger(input) && input !== ".") {
			//&& !Number.isInteger(temp[temp.length - 1])

			if (this.state.value !== "" && this.state.value !== "-") {
				this.props.disp(this.props.displ.toString() + input.toString());
				this.setState({
					left: parseFloat(this.state.value),
					value: "",
					operation: input,
				});
			} else if (temp.length > 1) {
				//!Number.isInteger(temp[temp.length - 1])
				// && Number.isInteger(pareseInt(temp[temp.lenth - 1]))
				if (input === "-" && this.state.value !== "-") {
					this.setState({
						value: this.state.value.toString() + input.toString(),
					});
					this.props.disp(
						this.props.displ.toString() + input.toString()
					);
				} else {
					let text;

					if (this.state.value === "-" && input !== "-") {
						text = /\D+$/;
					} else {
						text = /\D$/;
					}

					temp = temp.replace(text, input);

					this.props.disp(temp);

					this.setState({
						operation: input !== "-" ? input : this.state.operation,
						value: input === "-" ? "-" : "",
					});
				}
			} else {
				if (input === "+" || input === "-") {
					this.setState({
						value: input.toString(),
					});
					this.props.disp(input.toString());
					// this.props.displ.toString() +
					//this.state.value.toString() +
				}
			}
		} else {
			if (this.state.value === 0) {
				this.setState({
					value: input.toString(),
					operation: "",
				});
				this.props.disp(input.toString());
			} else if (input === "." && this.state.value.includes(".")) {
			} else if (this.state.value === "0" || this.props.displ === 0) {
				this.setState({
					value: input.toString(),
				});

				temp = temp.slice(0, temp.length - 1);
				this.props.disp(temp + input.toString());
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
			return (
				<Digit getter={this.handleInput} digit={dig.num} id={dig.id} />
			);
		});

		return (
			<React.Fragment>
				<Operations
					lhs={this.state.left}
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
			display: 0,
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
