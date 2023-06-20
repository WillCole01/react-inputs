import BtsInput from "./BtsInput";
import  {WordParser, Lister} from '../utils/CalcAutocompletion';
import {grammars,argument_mappings} from '../utils/AutocompleteData';

const InputList = ({ inputs, changeInput, handleClick}) => {
  
  // helper objects => expanding inputs
  const w = new WordParser();
  const l = new Lister(w, argument_mappings, grammars );
  
  const renderInput = (input, changeInput, handleClick) => {
    return (
      <li key={input.id}>
            <BtsInput input={input} changeInput={changeInput} handleClick={handleClick} lister={l} parser={w}/>
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