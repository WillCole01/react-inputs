import InputList from "./InputList";

const ScrollBox = ({ inputs, changeInput, handleClick}) => {
  
  return (
      <div className="overflow-auto ScrollBox">
            <InputList inputs={inputs} changeInput={changeInput} handleClick={handleClick}/>
      </div>
  );
};

export default ScrollBox;