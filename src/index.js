import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {Provider} from "react-redux"
import rakutenReducer from "./store/reducers/rakutenReducer"
import {createStore} from "redux"

//creating store
const store = createStore(rakutenReducer)

//render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
