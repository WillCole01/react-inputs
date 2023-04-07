import React, { useReducer } from 'react';

const inputs_state = [{ id: 1, inputText: "", isActive:false }];

const reducer = (state, action) => {
  switch (action.type) {

    case 'SET_NEW_INPUT_VALUE':
      return {
        ...state,
        inputs: [
          ...state.inputs,
          { id: action.payload.id, inputText: "", isActive:false }
        ]
      };

    case 'REMOVE_INPUT':
      return {
        ...state,
        inputs: [
          ...state.inputs,
          state.inpputs.filter((x) => (x.id != action.payload.input.id))
        ]
      };

      case 'CHANGE_INPUT':
        return {
            ...state,
            inputs: [ ...state.inputs,
                      state.inpputs
                          .filter((x) => (x.id === action.payload.input.id))
                          .value = action.payload.wording]
        };

    default:
      return state;
}};

const addInput      = input => ( dispatch({type: 'SET_NEW_INPUT_VALUE', payload: input}) );
const removeInput   = input => ( dispatch({ type: 'REMOVE_INPUT', payload: input}) );
const modifyInput   = (input, wording) => ( dispatch({ type: 'CHANGE_INPUT', payload: {input:{input}, wording:{wording}}}) );

const [state, dispatch] = useReducer(reducer, inputs_state);

export default addInput; removeInput; modifyInput; inputs_state;
