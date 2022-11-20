import { ACTIONS } from "./App"
import './App.css'
const OperationButton = ({ dispatch, operation }) => {
    const operationHandler = () => {
        dispatch({type: ACTIONS.ADD_OPERATION, payload: { operation }})
      } 
    return (
        <button onClick={operationHandler} className='color-orange'>{operation}</button>
        
    )
}

export default OperationButton