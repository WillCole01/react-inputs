import { HotKeys } from 'react-hotkeys';
// import InputReducer from "/react-inputs/src/reducers/InputReducer"; 


const AddInput = () =>
{

}

const handlers = {
  "AddInput": AddInput,
}

const keyMap = {
  AddInput: "a a",
  SKIP_FORWARD: "Shift+D",
  SKIP_BACKWARD: "a g",
};

<HotKeys
  keyMap={keyMap}
  handlers={handlers}
  className={className}
/>
// (<GlobalHotKeys keyMap={keyMap} handlers={handlers}>)