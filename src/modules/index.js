/**
 * modules/index.js에서 TODO
 *
 * - 여러 모듈에서 만든 리듀서 함수를 하나로 합친다.(redux의 combineReducers 함수 사용) --> rootReducer 만듦
 * - (src/index.js에서)스토어 생성시 createStore(reducer)에 파라미터로 넘길 reducer는 하나여야 하므로 함침
 * - 프로젝트 당 하나의 store를 생성해서 관리하기 위함
 */
import {combineReducers} from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
    counter,todos,
});

export default rootReducer;