import InputList from "./InputList";

const ScrollBox = ({ inputs, changeInput, handleClick, lister }) => {
  return (
    <div className="overflow-auto ScrollBox">
        <InputList inputs={inputs} changeInput={changeInput} handleClick={handleClick} lister={l}/>
    </div>
  );
};

export default ScrollBox;