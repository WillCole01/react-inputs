import {updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,
        getFirstInputIdWithAttributeValue, readInputAttribute} from '../utils/ObjectArrayManipulationFunctions';
import { saveToLocalStorage } from '../utils/LocalStorage';

const InputReducer = (state, action) => {
  
  let updatedState, lastActive, i, inputs, origin;
  updatedState = {};
  switch (action.type) {

    case 'FOCUS_INPUT':
      inputs = state.inputs;
      inputs.forEach( i => i['id'] === action.payload.input.input.id ? i['isFocused'] = true : i['isFocused'] = false );
      updatedState = { ...state, inputs: inputs};
    break;

    case 'CHANGE_INPUTTEXT':
        inputs = state.inputs;
        inputs.forEach( i => i['id'] === action.payload.input.input.id ? i.inputText = action.payload.input.input.wording: i);
        updatedState = { ...state, inputs: inputs}; 
    break;

    case 'ACTIVATE_UNIQUE':
      inputs = state.inputs;
      origin = action.payload.input.input.id;
      inputs.forEach( i => i['id'] === action.payload.input.input.id ? i.isActive = true : i.isActive = false);
      updatedState = { ...state, inputs: inputs, origin: origin, lastActive: origin}; 
    break;

    case 'DEACTIVATE_ALL':
      inputs = state.inputs;
      inputs.forEach((_, index, arr) => {arr[index].isActive = false});
      updatedState = { ...state, inputs: inputs, origin: -1, lastActive:-1}; 
    break;

    case 'SELECT_UP':
      inputs = state.inputs;
      lastActive = state.lastActive;
      if(lastActive === 1)
      {
        updateInputAttributeFromId(inputs,lastActive,'isActive',true);
      }
      else if(1 < lastActive && lastActive <= state.origin)
      { 
          lastActive = lastActive - 1;  
          updateInputAttributeFromId(inputs,lastActive,'isActive',true);
      }
      else if(state.origin < lastActive && lastActive <= inputs.length)
      {
        updateInputAttributeFromId(inputs,lastActive,'isActive',false);
          lastActive = lastActive - 1;
      }
      updatedState = { ...state, inputs: inputs,lastActive:lastActive}; 
    break;

    case 'SELECT_DOWN':
      inputs = state.inputs;
      lastActive = state.lastActive;
      
      if(lastActive === 1 && 1 < state.origin)
      {
        updateInputAttributeFromId(inputs,lastActive,'isActive',false);
        lastActive = lastActive + 1;
      }
      else if(lastActive === 1 && state.origin === 1)
      {
        lastActive = lastActive + 1;
        updateInputAttributeFromId(inputs,lastActive,'isActive',true);
      }
      else if(1 < lastActive && lastActive < state.origin)
      {
        updateInputAttributeFromId(inputs,lastActive,'isActive',false);
        lastActive = lastActive + 1;
      }
      else if(state.origin <= lastActive && lastActive < (inputs.length))
      { 
        updateInputAttributeFromId(inputs,(lastActive+1),'isActive',true);
        lastActive = lastActive + 1;
      }

      updatedState = { ...state, inputs: inputs,lastActive:lastActive}; 
    break;
    
    case 'CLEAR_ALL':
        updatedState = { inputs: [{ id: 1, inputText: "", isActive: false }], origin: -1,lastActive: -1};
        saveToLocalStorage('inputs', undefined);
    break;

    case 'TOGGLE_INPUT': // single click - activates just the one input
      inputs = state.inputs;
      inputs.forEach( i => i['id'] === action.payload.input.input.id ? i.isActive = !(i.isActive): i.isActive = false);
      updatedState = { ...state, inputs: inputs}; 
    break;

    case 'ADD_INPUT':
        updatedState = { ...state, inputs: [ ...state.inputs, { id: action.payload, inputText: "", isActive: false,  isFocused: false } ]};
        
    break;

    case 'REMOVE_INPUT':
          inputs = state.inputs;
          // if the input removed was an activeInput, and the current highest input is one up, move activeInput index
          if(inputs.filter(i => i.id === action.payload)[0].isActive === true && inputs.filter(i => i.id === (action.payload - 1))[0].isActive === true)
          {
            lastActive = lastActive - 1;
          }
          else if(inputs.filter(i => i.id === action.payload)[0].isActive === true && inputs.filter(i => i.id === (action.payload - 1))[0].isActive === false)
          {
            lastActive = -1;
            origin = -1;
          }
          updatedState = {...state,  inputs: state.inputs.filter(i => (i.id !== (action.payload))), lastActive:lastActive, origin:origin };

    break;

    default:
        updatedState = state;
    break;
  }
    // console.log(action);
    // console.log(updatedState);

    saveToLocalStorage('Calcs', updatedState);
    return updatedState;
};

export default InputReducer;