// todo모듈 작성
// todo컴포넌트의 상태관리를 위한 리덕스코드3종(액션/액션생성함수/리듀서)을 작성하는 파일

// TODO1. 액션타입 정의
import {createAction, handleActions} from "redux-actions";

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// TODO2. 액션생성함수 정의, export로 내보낸다.
// createAction(액션타입, payloadCreator)
export const changeInput = createAction(CHANGE_INPUT,input => input);

let id = 3; // insert호출시 마다 +1될 키값
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false
}));

export const toggle = createAction(TOGGLE,id => id);
export const remove = createAction(REMOVE,id => id);


// TODO3. 초기state와 리듀서함수 정의, export default로 단하나의 리듀서를 내보낸다.
// 초기state
const initialState = {
    input: '',
    todos: [
        {
            id:1,
            text:'리덕스기초 배우기',
            done:true
        }
        ,{
            id:2,
            text:'리액트와 리덕스 사용하기',
            done:false
        }
    ]
};

// const todos = handleActions({},initialState);
// handleActions사용시, handlers각각 액션에 필요한 추가데이터는 모두 action.payload 받아서 사용한다.
// (state,action) 이렇게 받아와서 action.payload로 전부 쓰면 헷갈릴수있으므로 >>> (state, {payload:input}) 이런식으로 각 데이터의 이름으로 가져오면 의미파악 수월
const todos = handleActions({
    [CHANGE_INPUT] : (state, {payload:input}) => produce( state, draft => { draft.input = input } ),

    [INSERT] :  (state, {payload:todo}) => produce( state, draft => { draft.todos.push(todo) } ),

    [TOGGLE] : (state, {payload:id}) => produce( state, draft => {
        const todos = draft.todos.find( todo => todo.id === id );
        todo.done = !todo.done;
    }),

    [REMOVE] : (state, {payload:id}) => produce( state, draft => {
        const index = draft.todos.findIndex(todo => todo.id !== id);
        draft.todos.splice(index,1);
    })
},initialState);
export default todos;