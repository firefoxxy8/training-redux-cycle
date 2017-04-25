import xs from 'xstream';
import {addSync, removeSync, checkSync} from './todoReducer';

/**
 * Utility methods for generating async stuff
 */
const periodify = time => item => {
	return xs.periodic(time)
		.take(1)
		.mapTo(item);
};

/**
 * Factoring below code
 */
const emitSyncFromType = (stream$, type) => {
	return stream$
		.filter(action => action.type === type)
		.map(periodify(300))
		.flatten();
};

/**
 * Cyclejs applications runs in a way that it always got an input called {sources}
 * and always provides an output that are called {sinks}
 * More important, everything in Cyclejs is a stream, even a simple value is a stream : xs.of(5) creates a stream of 1
 * value, 5.
 * From what I've understood, the cycleMiddleware transforms action into sources managed by the cycle Application
 * Then, we manage async stuff (in that case, xstream streams) and transform to emit sync actions
 * and then redux goes normal using reducer
 */
export const cycleApp = sources => {
	const root$ = sources.ACTION;

	const addTodo$ = emitSyncFromType(root$, 'ADD_ASYNC')
		.map(({payload})  => addSync(payload));

	const removeTodo$ = emitSyncFromType(root$, 'REMOVE_ASYNC')
		.map(({payload})  => removeSync(payload));

	const checkTodo$ = emitSyncFromType(root$, 'CHECK_ASYNC')
		.map(({payload}) => checkSync(payload));

	const todos$ = xs.merge(addTodo$, removeTodo$, checkTodo$);

	return {
		ACTION: todos$
	};
};