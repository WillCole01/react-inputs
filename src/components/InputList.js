import Input from "./Input.js";
// import ScriptTag from 'react-script-tag';


//handleActive={handleActive} handleActive
const InputList = ({ inputs, changeInput }) => {

  const renderInput = (input, initialList, changeInput) => {

    // add an initial list property from the lister

    return (
      <li>
        <Input input={input} inputList={initialList} changeInput={changeInput} /> 
      </li>
    );
  };

  return <ul>{inputs.map((x) => renderInput(x, initialList, changeInput))}</ul>;
};

export default InputList;
