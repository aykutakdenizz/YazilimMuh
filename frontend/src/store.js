import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./Reducer";

const store = createStore(
    combineReducers({
        reducer:reducer,
    }),
    {},
    applyMiddleware(createLogger(),thunk)
);
export default store;