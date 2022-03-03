[react+redux 구조&연결 요약정리](https://www.notion.so/yina-note/react-redux-8ecd860ff29e4b258d57328df7c86d61)

### react-redux를 사용하여 리액트어플리케이션 상태관리하기
>yarn add react-redux   

**프레젠테이셔널 컴포넌트 + 컨테이너 컴포넌트**를 분리
<aside>
리액트 프로젝트에서 리덕스 사용시 많이 사용하는 패턴

* 프레젠테이셔널 컴포넌트 : 
  - 주로 상태관리가 이루어지지 않음 
  - props를 받아와서 화면에 UI를 보여주기만 하는 컴포넌트
  - 일반적으로 src/components 경로에 저장   
    
* 컨테이너 컴포넌트 : 
  - 리덕스와 연동되어있는 컴포넌트,
  - 리덕스로부터 state를 받아오거나, 리덕스store에 action을 dispatch하기도 함
  - 일반적으로 src/container 경로에 저장
</aside>

### 리덕스 관련 코드 장성하기 
>- 액션타입
>- 액션생성함수
>- reducer코드   

리덕스를 사용할 때 기본적으로 위 3가지 코드를 작성해야 한다.   
* 각각 다른 파일에 작성해도 OK    
  (공식문서에서 사용, basic, 새로운 액션을 만들 때마다 3종류 파일 모두수정필요)   
* 기능별로 묶어서 한파일에 작성도 OK (Ducks패턴)

> Ducks패턴에서 각각의 액션/액션함수/리듀서를 작성한 코드를 **모듈**이라고 한다.   
> ex) counter모듈을 작성한다?    
>     counter의 상태관리를 위한 리덕스코드3종세트(액션/액션생성함수/리듀서)를 작성한 코드를 만든다.
- 이 프로젝트에서는 modules/counter.js에 counter모듈을 작성, modules/todos.js에 todos모듈을 작성함 


### 리덕스코드 작성, Ducks패턴의 모듈로 작성 TODO
#### TODO 1. 액션type 정의
```javascript
const INCREASE = 'counter/INCREASE';
```
- **'모듈이름/대문자액션이름'** 형태로 작성     
- 문자열안에 모듈 이름이 들어가서, 프로젝트가 커져도 겹치지 않도록


#### TODO 2. 각 type별 액션생성함수 정의
```javascript
export const increase = () => ({ type: INCREASE });
```
- 각각 export 키워드를 붙여 내보낸다.


#### TODO 3. 초기state & 리듀서함수 만들기 
```javascript
const initialState = { 
    number : 0
};


function counter(state = initialState, action) {

  switch (action.type){
    case INCREASE :
      return {
        number: state.number + 1
      };
    case INCREASE :
      return {
        number: state.number - 1
      };

    default:
      return state;
  }
}
export default counter; // counter모듈의 단 하나의 리듀서 함수 
```
- export default로 리듀서함수를 내보낸다.
- 함수이름은 counter모듈의 이름으로 함.

> ***export vs export default***    
> export : 여러개를 내보낼 수 있다.   
> export default : 단 한개만 내보낼 수 있다.   

---
<br>
<br>

# Provider 컴포넌트를 사용, 프로젝트에 리덕스 적용하기
리액트 컴포넌트에서 store를 사용할 수 있도록 `<App />` 컴포넌트를 react-redux에서 제공하는 `<Provider/>` 컴포넌트로 감싸준다.   
`<Provider />`사용시, store를 props로 전달해주어야함
```javascript
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer,composeWithDevTools()); 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

# 컨테이너 컴포넌트 만들기, 리덕스와 연동
### 1. 리덕스스토어에 컵근하여 원하는 상태를 받아올 수 있다.
### 2. 액션을 디스패치해줄 수 있다. 

counter모듈의 스토어와 연동된 CounterContainer 컨테이너컴포넌트의 기본 코드
```javascript
import Counter from "../components/Counter";

const CounterContainer = () => { 
return <Counter />;
};

export default CounterContainer;
```
*리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부른다.
<br>
<br>

### 3. react-redux의 connect함수 사용하여 `<CounterContainer />`를 리덕스와 연동하기
- `connect(mapStateToProps, mapDispatchToProps)`의 형태 
- CounterContainer를 내보낼(export) 때 사용
```javascript
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```
  * mapStateToProps(state) :    
    - 리덕스스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정   
    - 현재 스토어가 지니고있는 state를 파라미터로 받아 >>> 변경된 state값을 return
    - 컨테이너컴포넌트에서 호출한 connect함수에 의해 컨테이너컴포넌트의 returnJSX에서 props로 전달한다.
    ```javascript
    const mapStateToProps = state => ({
        number: state.counter.number,
    });
    ```
  * mapDispatchToProps(dispatch) : 
    - 액션생성함수를 컴포넌트의 props로 넘겨주기 위해 설정
    - store.dispatch를 파라미터로 받아 >>> **액션생성함수**를 dispatch한다.  
    - counter.js모듈 에서(TODO2) 각 type별 액션생성함수, 각각 export했기때문에 개별 import 가능
    ```javascript
    import {decrease, increase} from "../modules/counter";
    
    const mapDispatchToProps = dispatch => ({
          increase: () => {
            dispatch(increase());          
          },
          decrease: () => {
            dispatch(decrease());           
          },
    });
    ```
<br>

### 4. App.js에서 `<CounterContainer />`를 `<Counter />`대신 렌더링한다. 

# 리덕스 더 편하게 사용하기 : redux-actions, immer 라이브러리 활용
### 1. redux-actions
> yarn add redux-actions
- 액션생성 함수를 createAction(액션타입) 함수로 더 간결하게 작성가능
```javascript
// before
export const increase = () => ({ type: INCREASE }); 

// after
import {createAction} from "redux-actions";
export const increase = createAction(INCREASE);    
```
- switch문 대신 handleActions함수로 각 액션(타입)마다 업데이트 함수를 설정하는 형식으로 작성 가능

```javascript

// before
function counter(state = initialState, action) {
    switch (action.type){
        case INCREASE :
            return {
                number: state.number + 1
            };
        case DECREASE :
            return {
                number: state.number - 1
            };

        default:
            return state;
    }
}


// after
import {handleActions} from "redux-actions";
const counter = handleActions(
    {
        [INCREASE]: (state,action) => ({number: state.number + 1}),
        [DECREASE]: (state,action) => ({number: state.number - 1}),
    }
    ,initialState
);
```
***redux-actions의 함수 사용시, action.payload사용하기***
- **액션생성함수에서** ) createAction(액션타입, payloadCreator)로 payload로 들어갈 데이터를 지정
```javascript
// createAction(액션타입, payloadCreator)으로 액션생성함수 작성
export const changeInput = createAction(CHANGE_INPUT,input => input);
```

- **리듀서에서** ) handleActions사용시, handlers각각 액션에 필요한 추가데이터는 모두 action.payload 받아서 사용한다.
- (state,action) 이렇게 받아와서 action.payload로 전부 쓰면 헷갈릴수있으므로 >>> (state, {payload:input}) 이런식으로 각 데이터의 이름으로 가져오면 의미파악 수월
```javascript
// 리듀서 함수 작성 : action.payload로 받아와서 사용
const todos = handleActions(
    {
        [CHANGE_INPUT] : (state, {payload: input}) => ({...state, input}), 
     // [CHANGE_INPUT] : (state, action) => ( {...state, input: action.payload} ) 같은 코드임
    }
,initialState);
```


### 2. immer
> yarn add immer
- (기존) 리듀서에서 상태를 업데이트할 때 불변성을 유지하기 위해 spread연산자 (예:...state) 와 배열함수 사용
- (단점) 모듈 상태가 복잡해질 수록 객체의 깊이가 너무 깊어져서 번거롭다.
- (immer장점) 객체의 깊이가 단순할 수록 불변성 유지하며 값을 업데이트하기가 수월함
- (immer단점) 아주 간단한 모듈에 immer를 사용하면 오히려 코드가 길어질 수 있음, 잘 판단해서 사용
- immer를 사용한다고 모든 업데이트함수에 immer를 적용할 필요는 없음, js문법으로 사용하는 것이 더 짧으면 그 형태를 유지하는 것이 좋음.



 

