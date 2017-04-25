import React, {Component} from 'react';
import {TodoListWrapper} from './component/todoList';
import {store} from './logic/store';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<TodoListWrapper store={store}/>
			</div>
		);
	}
}

export default App;
