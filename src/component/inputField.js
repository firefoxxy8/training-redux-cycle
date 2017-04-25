import React, {Component} from 'react';

export class InputField extends Component {
	componentWillMount() {
		this.setState({
			value: ''
		});
	}

	_handlerInput = ev => {
		this.setState({
			value: ev.target.value
		});
	}

	_handleAdd = ev => {
		ev.preventDefault();
		this.props.handleClick({title: this.state.value});
		this.setState({value: ''});
	}

	render() {
		return (
			<form className="input-field" onSubmit={this._handleAdd}>
				<input type="text" placeholder="Add a new thing" value={this.state.value} onChange={this._handlerInput}/>
				<button>Add item</button>
			</form>
		);
	}
}