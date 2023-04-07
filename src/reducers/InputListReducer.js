const InputReducer = (state, action) => {
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

export default InputReducer;
