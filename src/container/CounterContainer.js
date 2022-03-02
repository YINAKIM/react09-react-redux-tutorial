import Counter from "../components/Counter";
import {connect} from "react-redux";
import {decrease, increase} from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => { // counter모듈의 state값과 action.type을 받아온다, props로 넣어줘야함
    return <Counter number={number} onIncrease={increase} onDecrease={decrease}/>;
};

// 현재 스토어가 가지고있는 state를 가져와 (store.getState()) >>> 변경된 state를 반환
const mapStateToProps = state => ({
    number: state.counter.number,
});

// dispatch를 받아 >>> 각각 액션생성함수를 dispatch함
const mapDispatchToProps = dispatch => ({
    increase : () => {
        dispatch(increase());           // counter.js 에서 TODO2(각 type별 액션생성함수, 각각 export했기때문에 개별 import 가능)
    },
    decrease : () => {
        dispatch(decrease());           // counter.js 에서 TODO2(각 type별 액션생성함수, 각각 export했기때문에 개별 import 가능)
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);