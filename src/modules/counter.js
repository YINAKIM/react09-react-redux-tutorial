import {createAction,handleActions} from "redux-actions";

// counter모듈 작성
// Counter컴포넌트의 상태관리를 위한 리덕스코드3종(액션/액션생성함수/리듀서)을 작성하는 파일

// TODO1. 액션타입 정의.
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// TODO2. 각 type별 액션생성함수 정의, 각각 export로 내보낸다.
// redux-actions.createActoion() 사용 : 매번 action객체를 직접 만들필요없이 간단하게 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// TODO3. 초기state와 리듀서함수 정의, export default로 단하나의 리듀서를 내보낸다.

// counter모듈의 초기state
const initialState = {
    number : 0
};

// counter모듈의 단 하나의 리듀서 함수
// (switch문 대신) redux-actions.handleActions({ 각 액션별 업데이트 함수들 },initialState) 함수 사용
const counter = handleActions(
    {
    [INCREASE]: (state,action) => ({number: state.number + 1}),
    [DECREASE]: (state,action) => ({number: state.number - 1}),
    }
    ,initialState
);

export default counter;