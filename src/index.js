import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import rootReducer from "./modules";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools()); // modules/index.js에서 합친 루트리듀서로 store생성
                                                               // composeWithDevTools() : 브라우저 개발자도구에서 State > 현재 리덕스 스토어 내부 상태가 보이도록 함
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
