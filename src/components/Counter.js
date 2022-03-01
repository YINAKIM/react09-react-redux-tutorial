/**
 * Counter컴포넌트
 * 숫자를 더하고, 뺄 수 있다.
 * @param number
 * @param onIncrease
 * @param onDecrease
 * @returns {JSX.Element}
 * @constructor
 */
const Counter = ({ number, onIncrease, onDecrease }) => {
    return (
        <div>
            <h1>{number}</h1>
            <div>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </div>
    );
};

export default Counter;