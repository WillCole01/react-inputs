var update = require('immutability-helper');

const InputReducer = (state, action) => {
  var index;
  let updatedState;

  switch (action.type) {
    
    case 'CHANGE_INPUTTEXT':
      index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
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
                       activeInputs: updatedActiveInputs,
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
    updatedState.activeInputs.clear();
    updatedState.activeInputs = updatedState.activeInputs.add(updatedInput.id);
  break;

  case 'DEACTIVATE_SINGLEINPUT':
    var updatedStateInputs = state.inputs;
    updatedStateInputs.forEach(i => (i.isActive = false));
    updatedState = {  ...state,  
                      inputs: updatedStateInputs
                    };
    updatedState.activeInputs.clear();
  break;

  case 'ACTIVATE_INPUT': // single click - activates just the one input
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
    updatedState = {  ...state,  
                      inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                    };
    updatedState.activeInputs = updatedState.activeInputs.add(updatedInput.id);
  break;

  case 'DEACTIVATE_INPUT':
    index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
    var updatedInput = update(state.inputs[index], {isActive: {$set: false}});
    updatedState = {  ...state,  
                        inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                     };
    updatedState.activeInputs = updatedState.activeInputs.delete(updatedInput.id);
  break;
  
    case 'ACTIVATE_MULTIPLEINPUTS': // maybe split this into add active inputs and remove active inputs? -> one function = one target
      index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
      var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
      updatedState = {  ...state,  
                        inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                      };
      updatedState.activeInputs.add(updatedInput.id);
    break;

    case 'DEACTIVATE_MULTIPLEINPUTS':
      index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
      var updatedInput = update(state.inputs[index], {isActive: {$set: false}});
      updatedState = {  ...state,  
                          inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                       };
      updatedState.activeInputs.delete(updatedInput.id);
    break;

   default:
      updatedState = state;
   break;

  }
    return updatedState;
};

export default InputReducer;
