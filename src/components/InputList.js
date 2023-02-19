import Input from "./Input.js";
//handleActive={handleActive} handleActive
const InputList = ({ inputs, changeInput }) => {
  const renderInput = (input, changeInput) => {
    return (
      <li>
        <Input input={input} changeInput={changeInput} />
      </li>
    );
  };

  return <ul>{inputs.map((x) => renderInput(x, changeInput))}</ul>;
};

export default InputList;
