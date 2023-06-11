import {updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,
        getFirstInputIdWithAttributeValue, readInputAttribute} from '../utils/ObjectArrayManipulationFunctions';
import { saveToLocalStorage } from '../utils/LocalStorage';

const InputReducer = (state, action) => {
  
  let updatedState, lastActive, i, inputs, origin;
  updatedState = {};
  switch (action.type) {

    case 'CHANGE_INPUTTEXT':
        i = getFirstInputIndexWithAttributeValue(state.inputs, 'id', action.payload.input.input.id);
        inputs = state.inputs;
        updateInputAttributeFromIndex(inputs,i,'inputText',action.payload.wording.wording);
        updatedState = { ...state, inputs: inputs}; 
    break;

    case 'ACTIVATE_UNIQUE':
      i = getFirstInputIndexWithAttributeValue(state.inputs, 'id', action.payload.input.input.id);
      inputs = state.inputs;
      origin = i;
      inputs.forEach((part, index, arr) => {arr[index].isActive = false});
      updateInputAttributeFromIndex(inputs,i,'isActive',true);
      updatedState = { ...state, inputs: inputs, origin: origin, lastActive: origin}; 
    break;

    case 'DEACTIVATE_ALL':
      inputs = state.inputs;
      inputs.forEach((part, index, arr) => {arr[index].isActive = false});
      updatedState = { ...state, inputs: inputs, origin: -1, lastActive:-1}; 
    break;

    case 'SELECT_UP':
      inputs = state.inputs;
      lastActive = state.lastActive;

      if(lastActive === 0)
      {
          updateInputAttributeFromIndex(inputs,lastActive,'isActive',true);
      }
      else if(0 < lastActive && lastActive <= state.origin)
      { 
          lastActive = lastActive - 1;  
          updateInputAttributeFromIndex(inputs,lastActive,'isActive',true);
      }
      else if(state.origin < lastActive && lastActive <= inputs.length)
      {
          updateInputAttributeFromIndex(inputs,lastActive,'isActive',false);
          lastActive = lastActive - 1;
      }
      updatedState = { ...state, inputs: inputs,lastActive:lastActive}; 
    break;

    case 'SELECT_DOWN':
      inputs = state.inputs;
      lastActive = state.lastActive;
      
      if(0 === lastActive)
      {
        updateInputAttributeFromIndex(inputs,lastActive,'isActive',false);
        lastActive = lastActive + 1;
      }
      else if(0 < lastActive && lastActive < state.origin)
      {
        updateInputAttributeFromIndex(inputs,lastActive,'isActive',false);
        lastActive = lastActive + 1;
      }
      else if(state.origin <= lastActive && lastActive < (inputs.length - 1))
      { 
        updateInputAttributeFromIndex(inputs,(lastActive+1),'isActive',true);
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
      i = getFirstInputIndexWithAttributeValue(inputs, 'id', action.payload.input.input.id);
      acitvated = readInputAttribute(inputs,i,'isActive');
      updateInputAttributeFromId(inputs,i,'isAcive',(!acitvated));
      updatedState = { ...state, inputs: inputs}; 
    break;

    case 'ADD_INPUT':
        updatedState = { ...state, inputs: [ ...state.inputs, { id: action.payload, inputText: "", isActive: false } ]};
    break;

    case 'REMOVE_INPUT':
          updatedState = (action.payload > 1) ? {...state,  inputs: state.inputs.filter(i => (i.id !== (action.payload)))} : {...state};
    break;

    default:
        updatedState = state;
    break;
  }
    return updatedState;
};

export default InputReducer;