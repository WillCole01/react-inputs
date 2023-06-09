import {updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,
        getFirstInputIdWithAttributeValue, readInputAttribute} from '../utils/ObjectArrayManipulationFunctions';

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

      if(0 < lastActive && lastActive < state.origin)
      { updateInputAttributeFromIndex(inputs,(lastActive- 1),'isActive',false)}
      else 
      { updateInputAttributeFromIndex(inputs,(lastActive-1),'isActive',true)}
      lastActive = lastActive - 1;
      updatedState = { ...state, inputs: inputs,lastActive:lastActive}; 
    break;

    case 'SELECT_DOWN':
      inputs = state.inputs;
      lastActive = state.lastActive;
      if(lastActive < (action.payload - 1))
      {
        if(lastActive < state.origin)
        {updateInputAttributeFromIndex(inputs,(lastActive+1),'isActive',false);
         lastActive = lastActive + 1;}
        else 
        { updateInputAttributeFromIndex(inputs,(lastActive+1),'isActive',true);
          lastActive = lastActive + 1;}
        }
      updatedState = { ...state, inputs: inputs,lastActive:lastActive}; 
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
        updatedState = {...state,  inputs: state.inputs.filter(i => (i.id !== (action.payload)))};
    break;

    default:
        updatedState = state;
    break;
  }
    return updatedState;
};

export default InputReducer;