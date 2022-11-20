import { ACTIONS } from "./App"
import './App.css'
const NumberButton = ({ dispatch, number, classname }) => {
    const numberHandler = () => {
        dispatch({type: ACTIONS.ADD_NUMBER, payload: { number}})
      } 
    return (
        <button onClick={numberHandler}  className={classname}>{number}</button>
    )
}

export default NumberButton