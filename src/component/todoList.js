import React from 'react';
import {connect} from 'react-redux';
import {add, remove, loading, check} from './../logic/todoReducer';
import {InputField} from './inputField';

const TodoList = ({list, isLoading, addTodo, removeTodo, checkTodo}) => {
	let i = 0;
	return (
		<div>
			<InputField handleClick={addTodo}/>
			<div className="todo-list">
				{list.length > 0 ? list.map(item => {
					i++;
					return (
						<div key={i} className="todo-item">
							<div className={`todo-item-title ${item.checked ? 'checked' : ''}`}>{item.title}</div>
							<input type="checkbox" onChange={() => checkTodo(item)}/>
							<div className="btn-danger" onClick={() => removeTodo(item)}>Remove</div>
						</div>
					);
				}) : <div className="nothing">Nothing to show :(</div>}
			</div>
			{isLoading && <div className="loader"/>}
		</div>
	);
};

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
	addTodo: item => {
		dispatch(loading());
		dispatch(add(item));
	},
	removeTodo: item => {
		dispatch(loading());
		dispatch(remove(item));
	},
	checkTodo: item => dispatch(check(item))
});

export const TodoListWrapper = connect(mapStateToProps, mapDispatchToProps)(TodoList);