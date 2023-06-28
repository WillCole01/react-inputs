import InputList from "./InputList";

const ScrollBox = ({ inputs, changeInput, handleClick, handleInputFocus}) => {
  
  return (
      <div className="overflow-auto ScrollBox">
            <InputList inputs={inputs} changeInput={changeInput} handleClick={handleClick} handleInputFocus={handleInputFocus}/>
      </div>
  );
};

export default ScrollBox;