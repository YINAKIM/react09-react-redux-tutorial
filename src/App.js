import './App.css';
import Counter from "./components/Counter";
import Todos from "./components/Todos";
import CounterContainer from "./container/CounterContainer";

const App = () => {
    return (
        <div>
            <CounterContainer />
            <hr/>
            <Todos/>
        </div>
    );
};

export default App;
