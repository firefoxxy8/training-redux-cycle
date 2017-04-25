import {createCycleMiddleware} from 'redux-cycles';
import {applyMiddleware, createStore} from 'redux';
import {todoReducer} from './todoReducer';
import {run} from '@cycle/run';

/**
 * The Cycle application that would act as a stream processor for our async actions
 */
import {cycleApp} from './cycleApp';

/**
 * Simply manage action and state, not that hard
 */
const cycleMiddleware = createCycleMiddleware();

/**
 * Create an action driver (sinks -> sources) and is able to transform them into streams used by the cyclejs app
 */
const {makeActionDriver} = cycleMiddleware;

export const store = createStore(
	todoReducer,
	applyMiddleware(cycleMiddleware)
);

/**
 * We're passing the Cycle application to run
 * and the sources that would be used inside the application, jump on cycleApp file for more details
 */
run(cycleApp, {
	ACTION: makeActionDriver()
});