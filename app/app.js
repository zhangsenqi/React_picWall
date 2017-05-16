import React from "react";
import {render} from "react-dom";
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers/index.js";
import Main from "./components/Main.js";
// import {createLogger} from "redux-logger";
import thunk from "redux-thunk";



let store = createStore(reducer,applyMiddleware(thunk));

render(
	<Provider store={store}>
		<Main></Main>
	</Provider>,
	document.getElementById("container")
)