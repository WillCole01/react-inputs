import {updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,
        getFirstInputIdWithAttributeValue, readInputAttribute} from '../utils/ObjectArrayManipulationFunctions';

const InputReducer = (state, action) => {
  let updatedState, i, activatedOrder, inputs, fromIndex, toIndex;
  console.log(action.type);

  switch (action.type) {

  case 'CHANGE_INPUTTEXT':
      i = getFirstInputIndexWithAttributeValue(state.inputs, id, action.payload.input.input.id);
      inputs = state.inputs;
      updateInputAttributeFromIndex(inputs,i,'inputText',action.payload.wording.wording);
      updatedState = { ...state, inputs: inputs}; 
  break;

  case 'ADD_INPUT':
      updatedState = { ...state, inputs: [ ...state.inputs, { id: action.payload, inputText: "", isActive: false } ]};
  break;

  case 'REMOVE_INPUT':
      updatedState = {...state,  inputs: state.inputs.filter(i => (i.id !== (action.payload)))};
  break;

  case 'ACTIVATE_SINGLEINPUT': // single click - activates just the one input
    i = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    inputs = state.inputs;
    inputs.forEach(i => (i.isActive = false));
    activatedOrder = state.activatedOrder;
    activatedOrder['currentIndex']=i; activatedOrder['lastIndex']= 0;
    updateInputAttributeFromIndex(inputs,i,'isActive',true);
    // updateInputAttributeFromIndex(inputs,index,'lastActive',true);
    updatedState = {  ...state, activatedOrder: activatedOrder, inputs: inputs};
  break;

  case 'ACTIVATE_INPUT': // single click - activates just the one input
    i = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    inputs = state.inputs;
    activatedOrder = state.activatedOrder;
    activatedOrder['lastIndex']= state.activatedOrder.currentIndex;activatedOrder['currentIndex']=i;
    updateInputAttributeFromIndex(inputs,i,'isActive',true);
    // updateInputAttributeFromIndex(inputs,index,'lastActive',true);
    updatedState = {  ...state, inputs: inputs};
  break;

  case 'DEACTIVATE_INPUT':
    i = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    inputs = state.inputs;
    activatedOrder = state.activatedOrder;
    activatedOrder['lastIndex']= 0;activatedOrder['currentIndex']=0;
    updateInputAttributeFromIndex(inputs,i,'isActive',false);
    updatedState = {  ...state, inputs: inputs};
  break;

  case 'ACTIVATE_MULTIPLEINPUTS': // maybe split this into add active inputs and remove active inputs? -> one function = one target
    i = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    activatedOrder = state.activatedOrder;
    inputs = state.inputs;
    fromIndex = Math.min(i, activatedOrder['currentIndex']) + 1;
    toIndex   =  Math.max(i, activatedOrder['currentIndex']) + 1;
    inputs.forEach(function(input, index) {
                    if(input['id'] <= fromIndex && input['id'] >= toIndex){input["isActive"] = true;} 
                  }, inputs);
    activatedOrder['lastIndex']= activatedOrder['currentIndex'];activatedOrder['currentIndex']=i;
    updatedState = {  ...state,activatedOrder: activatedOrder, inputs: inputs};
  break;

  case 'DEACTIVATE_ALLINPUTS':
    inputs = state.inputs;
    inputs.forEach(i => (i.isActive = false));
    updatedState = {  ...state,activatedOrder:{lastIndex:0,currentIndex:0}, inputs: inputs};
  break;

  case 'ACTIVATE_ALLINPUTS':
   inputs = state.inputs;
   inputs.forEach((i) => (i.isActive = true));
   updatedState = {  ...state,activatedOrder:{lastIndex:0,currentIndex:0}, inputs: inputs};

   default:
      updatedState = state;
   break;
  
  }
    return updatedState;
};

export default InputReducer;