import {  useReducer} from 'react';
import './App.css';
import NumberButton from './numberButton';
import OperationButton from './operationButton';
export const ACTIONS = {
  ADD_NUMBER: 'add-number',
  ADD_OPERATION: 'add-opration',
  CLEAR_ALL: 'clear-all',
  DELETE_NUMBER: 'delete-last-number',
  CALCULATE_RESULT: 'claculate-results'
}


const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_NUMBER:
      if (state.overwrite) {
        return {
          ...state,
          currentNumber: payload.number,
          overwrite: false
        }
      }
      if (payload.number === '0' && state.currentNumber === '0') {
        return state
      } 
      if (payload.number === '.' && state.currentNumber.includes('.') ) {
        return state
      }
      return {
        ...state,
        currentNumber: `${state.currentNumber || ''}${payload.number}`,
      }
    case ACTIONS.CLEAR_ALL:
      return{}
    case ACTIONS.ADD_OPERATION:
      if(state.currentNumber == null && state.previousNumber == null) {
        return state
      }
      if(state.previousNumber == null) {
        return {
          ...state,
          operation: payload.operation,
          previousNumber: state.currentNumber,
          currentNumber: null,
        } 
      }
      if (state.currentNumber == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        previousNumber: evaluate(state),
        operation: payload.operation,
        currentNumber:null
      }
    case ACTIONS.CALCULATE_RESULT:
      if (state.operation == null || state.currentNumber == null || state.previousNumber == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousNumber: null,
        operation: null,
        currentNumber: evaluate(state)
      }
    case ACTIONS.DELETE_NUMBER:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentNumber: null,
        }
      }
      if (state.currentNumber == null) {
        return state
      }
      if (state.currentNumber.length === 1) {
        return {
          ...state,
          currentNumber:null
        }
      }
      return {
        ...state,
        currentNumber: state.currentNumber.slice( 0, -1)
      }
  }
}

const evaluate = ({currentNumber, previousNumber, operation}) => {
  const current = parseFloat(currentNumber)
  const previous = parseFloat(previousNumber)
  if (isNaN(previous) || isNaN(current)) return ''
  let total = ''
  switch (operation) {
    case '+':
      total = previous + current
      break
    case '-':
      total = previous - current
    break
    case '÷':
      total = previous / current
      break
    case 'x':
      total = previous * current
      break
    case '%':
      total = previous % current
      break
    default:
      alert('error')
    
  }
  return total.toString()
  
}


function App() {
  const [{currentNumber, previousNumber, operation}, dispatch] = useReducer(reducer, {})
  
  const INT_FORMATTTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0,
  })

  const formatNumber = (number) => {
    if (number == null) return
    const [integer, decimal] = number.split('.')
    if (decimal == null) return INT_FORMATTTER.format(integer)
    return `${INT_FORMATTTER.format(integer)}.${decimal}`
  }
  const clear = () => {
    dispatch({type: ACTIONS.CLEAR_ALL})
  }
  const deleteHandler = () => {
    dispatch({type: ACTIONS.DELETE_NUMBER})
  }

  const resultHandler = () => {
    dispatch({type: ACTIONS.CALCULATE_RESULT})
  }
  const operationHandler = () => {
    dispatch({type: ACTIONS.ADD_OPERATION, payload: { operation }})
  }
  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{formatNumber(previousNumber)}{operation} </div>
        <div className='current-operand'>{formatNumber(currentNumber)}</div>
      </div>
      <button  className='grey' onClick={clear}>AC</button>
      <button  className='grey' onClick={deleteHandler}>C</button>
      <OperationButton operation='%' dispatch={dispatch} className='grey' />
      <OperationButton operation='÷' dispatch={dispatch} className='grey' />
      <NumberButton number='7' dispatch={dispatch} />
      <NumberButton number='8' dispatch={dispatch} />
      <NumberButton number='9' dispatch={dispatch} />
      <OperationButton operation='x' dispatch={dispatch} className='color-orange' />
      <NumberButton number='4' dispatch={dispatch} />
      <NumberButton number='5' dispatch={dispatch} />
      <NumberButton number='6' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} className='color-orange' />
      <NumberButton number='1' dispatch={dispatch} />
      <NumberButton number='2' dispatch={dispatch} />
      <NumberButton number='3' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} className='color-orange' />
      <NumberButton number='0' classname='span2' dispatch={dispatch} />
      <NumberButton number='.' dispatch={dispatch} />
      <button className='color-orange' onClick={resultHandler}>=</button>
    </div>
  );
}


export default App;
