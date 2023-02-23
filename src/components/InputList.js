import Input from "./Input.js";
import  {Lister, WordParser} from '../utils/Autocomplete';
import '../utils/Globals.js';

//handleActive={handleActive} handleActive
const InputList = ({ inputs, changeInput }) => {
  const w = new WordParser();
  const l = new Lister(word_parser=w, args=componentArguments, grammars=grammars );
  const initialList = l.getInitialList();

  useEffect( () => {
    // get the input that has changed, check the event (specific key press), determine whether a new list must be passed down based on the object
  }
    ,[inputs]
  );
  

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
