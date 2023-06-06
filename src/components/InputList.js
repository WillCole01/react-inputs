import BtsInput from "./BtsInput";

const InputList = ({ inputs, changeInput, handleClick, lister }) => {
  
  const getWordList = (input) => {lister.getWordList(input.inputText)};
  const initialWordList = lister.getInitialList();

  const renderInput = (input, changeInput, handleClick) => {
    return (
      <li key={input.id}>
           <BtsInput input={input} changeInput={changeInput} handleClick={handleClick} initialWordList={initialWordList}/>
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