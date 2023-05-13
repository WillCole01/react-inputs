// var update = require('immutability-helper');
import {updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,
        getFirstInputIdWithAttributeValue, readInputAttribute} from '../utils/ObjectArrayManipulationFunctions';

const updateInputAttributeFromId = (inputs, id=NaN, attribute, newValue) => {
  for (let object of inputs) {
    if (!isNaN(id) && object.id === id) {
        object[attribute] = newValue;
    }
    else if(isNaN(id))
    {
      object[attribute] = newValue;
    }
  }
  return;
}

const updateInputAttributeFromIndex = (inputs, index=NaN, attribute, newValue) => {
  let arrayIndex = 0;
  for (let object of inputs) {
    if (!isNaN(index) && arrayIndex === index) 
    {
        object[attribute] = newValue;
    }
    else if(isNaN(index))
    {
      object[attribute] = newValue;
    }
    arrayIndex++;
  }
  return;
}

const readInputAttribute = (inputs, id, attribute) => {
  let index = inputs.findIndex((input) => input.id === id);
  return inputs[index][attribute];
}

const getFirstInputIdWithAttributeValue = (inputs,attribute,value,returnAttribute) => {
  for (let object of inputs) {
    if(object[attribute] === value)
    {
      return object[returnAttribute];
    }
  }
}

const getFirstInputIndexWithAttributeValue = (inputs,attribute,value) => {
  let i = 0;
  for (let object of inputs) {
    if(object[attribute] === value)
    {
      return i;
    }
    i++;
  }
}

const InputReducer = (state, action) => {
  var index;
  let updatedState;

  switch (action.type) {
    
  case 'CHANGE_INPUTTEXT':
      index = getFirstInputIndexWithAttributeValue(state.inputs, id, action.payload.input.input.id);
      inputs = state.inputs;
      updateInputAttributeFromId(inputs)      
      var updatedInput = update(state.inputs[index], {inputText: {$set: action.payload.wording.wording}});
      updatedState = {
                      ...state,
                      inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                     };    
  break;

  case 'ADD_INPUT':
      updatedState = {
        ...state,
        inputs: [
          ...state.inputs,
        { id: action.payload, inputText: "", isActive: false }
        ]
      };
  break;

  case 'REMOVE_INPUT':
      let updatedActiveInputs = state.activeInputs;
      updatedActiveInputs.delete(action.payload);
      updatedState = {
                       ...state,
                       activeInputs: updatedActiveInputs[],
                       inputs: state.inputs.filter(i => (i.id !== (action.payload)))
                    };
  break;

  case 'ACTIVATE_SINGLEINPUT': // single click - activates just the one input
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);

    var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
    var updatedStateInputs = state.inputs;
    updatedStateInputs.forEach(i => (i.isActive = false));
    
    updatedState = {  ...state,  
      inputs: update(updatedStateInputs, {$splice: [[index, 1, updatedInput]]})
    };
    console.log(updatedState.activeInputs);
    updatedState.activeInputs.clear();
    updatedState.activeInputs = updatedState.activeInputs.add(updatedInput.id);
  break;

  case 'DEACTIVATE_SINGLEINPUT':
    var updatedStateInputs = state.inputs;
    updatedStateInputs.forEach(i => (i.isActive = false));
    updatedState = {  ...state,  
                      inputs: updatedStateInputs
                    };
                    console.log(updatedState.activeInputs);
    updatedState.activeInputs.clear();
  break;

  case 'ACTIVATE_INPUT': // single click - activates just the one input
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
    updatedState = {  ...state,  
                      inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                    };
    console.log(updatedState.activeInputs);
    updatedState.activeInputs = updatedState.activeInputs.push(updatedInput.id);
  break;

  case 'DEACTIVATE_INPUT':
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: false}});
    updatedState = {  ...state,  
                        inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                     };
    console.log(updatedState.activeInputs);
    updatedState.activeInputs = updatedState.activeInputs.delete(updatedInput.id); // not working
  break;

  case 'ACTIVATE_MULTIPLEINPUTS': // maybe split this into add active inputs and remove active inputs? -> one function = one target
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
    updatedState = {  ...state,  
                      inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                    };
    console.log(updatedState.activeInputs);
    updatedState.activeInputs.add(updatedInput.id);
  break;
  
  case 'DEACTIVATE_MULTIPLEINPUTS':
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: false}});
    updatedState = {  ...state,  
                        inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                     };
    console.log(updatedState.activeInputs);
    updatedState.activeInputs.delete(updatedInput.id);
  break;

  case 'ACTIVATE_ALLINPUTS':
   let updatedInputs = state.inputs;
   updatedInputs.forEach((i) => (i.isActive = true));
   updatedState = {  ...state,  
     inputs: updatedInputs
   };

   default:
      updatedState = state;
   break;
  
  }
    return updatedState;
};

export default InputReducer;