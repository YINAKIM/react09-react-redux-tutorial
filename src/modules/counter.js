// counter모듈 작성
// Counter컴포넌트의 상태관리를 위한 리덕스코드3종(액션/액션생성함수/리듀서)을 작성하는 파일

// TODO1. 액션타입 정의.
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// TODO2. 각 type별 액션생성함수 정의, 각각 export로 내보낸다.
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// TODO3. 초기state와 리듀서함수 정의, export default로 단하나의 리듀서를 내보낸다.

// counter모듈의 초기state
const initialState = {
    number : 0
};

// counter모듈의 단 하나의 리듀서 함수
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

export default counter;