var update = require('immutability-helper');

const InputReducer = (state, action) => {
  var index;
  let updatedState;

  switch (action.type) {
    
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
      updatedState = {
                       activeInputs: state.activeInputs.filter(i => (i !== action.payload)),
                       inputs: state.inputs.filter(i => (i.id !== (action.payload)))
                    };
    break;

    case 'ACTIVATE_INPUT':
      index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
      if (state.inputs[index].isActive === false)
      {
        var updatedInput = update(state.inputs[index], {isActive: {$set: true}});
        updatedState = {  ...state,  
                          inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                        };
        updatedState.activeInputs.push(index);
      }
      else
      { 
        var updatedInput = update(state.inputs[index], {isActive: {$set: false}});
        updatedState = {  ...state,  
                          inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})
                       };
        updatedState.activeInputs.filter(i => (i !== index));
      }
    break;

    case 'CHANGE_INPUT':
      index = state.inputs.findIndex((inp) => inp.id === action.payload.input.input.id);
      var updatedInput = update(state.inputs[index], {inputText: {$set: action.payload.wording.wording}});
      updatedState = {inputs: update(state.inputs, {$splice: [[index, 1, updatedInput]]})};    
    break;

   default:
      updatedState = state;
   break;

  }
    return updatedState;
};

export default InputReducer;
