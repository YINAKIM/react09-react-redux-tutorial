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

