import BtsInput from "./BtsInput";
// new local hotkeys to deal with intellisense in calcs + conversion to json

const InputList = ({ inputs, changeInput, handleClick, lister }) => {
  
  const getWordList = (input) => {lister.getWordList(input.inputText)};
  const initialWordList = lister.getInitialList();

  const renderInput = (input, changeInput, handleClick) => {
    return (
      <li key={input.id}>
        {/* <HotKeys keyMap={hotkeymap} handlers={hotkeyhandler}> */}
            <BtsInput input={input} changeInput={changeInput} handleClick={handleClick} initialWordList={initialWordList}/>
        {/* </HotKeys> */}
      </li>
    );
  };
  
  return (<ul>
              {
                inputs.map((x) => (renderInput(x,  changeInput, handleClick )))
              }
          </ul>);
};

export default InputList;