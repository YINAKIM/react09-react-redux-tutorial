// todo모듈 작성
// todo컴포넌트의 상태관리를 위한 리덕스코드3종(액션/액션생성함수/리듀서)을 작성하는 파일

// TODO1. 액션타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// TODO2. 액션생성함수 정의, export로 내보낸다.
export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
});


let id = 3; // insert호출시 마다 +1될 키값
export const insert = text => ({
    type: INSERT,
    todo:{
        id: id++,
        text,
        done: false
    }
});

export const toggle = id => ({
    type: TOGGLE,
    id
});


export const remove = id => ({
    type: REMOVE,
    id
});


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

function todos(state=initialState, action) {
    switch (action.type){
        case CHANGE_INPUT:
            return {
              ...state,
              input: action.input
            };

        case INSERT:
            return {
              ...state,
              todos: state.todos.concat(action.todo)
            };

        case TOGGLE:
            return {
              ...state,
              todos: state.todos.map(todo=>
                  todo.id === action.id ? { ...todo, done:!todo.done } : todo
              )
            };

        case REMOVE:
            return {
              ...state,
              todos: state.todos.filter(todo => todo.id !== action.id)
            };

        default:
            return state;
    }
}

export default todos;