import Input from "./Input.js";

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
