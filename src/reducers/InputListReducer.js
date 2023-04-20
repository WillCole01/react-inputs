const InputReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case 'ADD_INPUT':
      updatedState = {
        ...state,
        inputs: [
          ...state.inputs,
        { id: action.payload.current, inputText: "", isActive:false }
        ]
      };
      break;

    case 'REMOVE_INPUT':
      updatedState = {
        ...state,
        inputs: [
          ...state.inputs
          // ,state.inputs.filter(x => (x.id != action.payload.input.id))
        ]
      };
      break;

      case 'CHANGE_INPUT':
        updatedState = {
          ...state,
          inputs: [
            ...state.inputs,
          { id: action.payload.input.input.id, 
            inputText:action.payload.wording.wording, 
            isActive:action.payload.input.input.isActive }
          ]
        };
        // updatedState = {
        //     ...state,
        //     inputs: [ ...state.inputs,
        //       inputs.filter(x => x.id == action.payload.input.id)
        //       .value = action.payload.wording
        //       // ,state.inpputs
        //       //             .filter((x) => (x.id === action.payload.input.id))
        //       //             .value = action.payload.wording
        //                 ]
        // };
        break;
    default:
      updatedState = state;
      break;
    }
    return updatedState;
};

export default InputReducer;
