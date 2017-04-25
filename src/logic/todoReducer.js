/**
 * These actions are async and managed by the cycle part of the app
 */
export const add = payload => ({type: 'ADD_ASYNC', payload});
export const remove = payload => ({type: 'REMOVE_ASYNC', payload});
export const check = payload => ({type: 'CHECK_ASYNC', payload});
/**
 * Synchronous action creator
 */
export const addSync = payload => ({type: 'ADD', payload});
export const removeSync = payload => ({type: 'REMOVE', payload});
export const checkSync = payload => ({type: 'CHECK', payload});
export const loading = () => ({type: 'LOADING'});

const actionHandler = {
	LOADING: state => ({...state, isLoading: !state.isLoading}),
	ADD: (state, item) => ({...state, isLoading: false, list: [...state.list, item.payload]}),
	REMOVE: (state, {payload}) => {
		const index = state.list.indexOf(payload);
		return {
			...state,
			isLoading: false,
			list: [...state.list.slice(0, index), ...state.list.slice(index + 1)]
		}
	},
	CHECK: (state, {payload}) => {
		const index = state.list.indexOf(payload);
		const item = state.list[index];
		const newItem = {...item, checked: !item.checked};
		const list = [...state.list.slice(0, index), newItem, ...state.list.slice(index + 1)];
		return {
			...state,
			isLoading: false,
			list
		};
	}
};


const initialState = {
	list: [{title: 'First task TODO'}],
	isLoading: false
};
export const todoReducer = (state = initialState, action = {type: null}) => {
	const handler = actionHandler[action.type];
	return handler ? handler(state, action) : {...state};
};