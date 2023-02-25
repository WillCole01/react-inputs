import Input from "./Input.js";
import  add, {WordParser,Lister} from '../utils/CalcAutocompletion.js';
import '../utils/Globals.js';
// import ScriptTag from 'react-script-tag';


//handleActive={handleActive} handleActive
const InputList = ({ inputs, changeInput }) => {

    const w = new WordParser();
    const l = new Lister(w, componentArguments, grammars );
    const initialList = l.getInitialList();


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
