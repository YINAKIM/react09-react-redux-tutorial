import {connect} from "react-redux";
import Todos from "../components/Todos";
import {changeInput, insert, remove, toggle} from "../modules/todos";

const TodosContainer = ({
                input,
                todos,
                changeInput,
                insert,
                toggle,
                remove,
                        }) => {
    return (
        <Todos
            input={input}
            todos={todos}
            onChangeInput={changeInput}
            onInsert={insert}
            onToggle={toggle}
            onRemove={remove}
        ></Todos>
    );
};

// 구조분해할당 문법으로 todos를 분리 : state.todos.input말고 todos.input사용
// connect의 파라미터로 보낼 (mapStateToProps,mapDispatchProps) 를 따로작성하지 않고 간단하게 작성
export default connect(
    ({todos}) => ({
        input: todos.input,
        todos: todos.todos,
    }),
    {
        changeInput,
        insert,
        toggle,
        remove,
    }
)(TodosContainer);