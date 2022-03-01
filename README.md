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

