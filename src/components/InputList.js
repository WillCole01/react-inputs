import BtsInput from "./BtsInput";
import  {WordParser, Lister} from '../utils/CalcAutocompletion';
import {grammars,argument_mappings} from '../utils/AutocompleteData';
import { useEffect, useState } from "react";

const InputList = ({ inputs, changeInput, handleClick, handleInputFocus}) => {
  
  // helper objects => expanding inputs
  const w = new WordParser();
  const l = new Lister(w, argument_mappings, grammars );
  
  const renderInput = (input, changeInput, handleClick) => {  
  const [calcsList, setCalcsList] = useState('');

  useEffect ( () => { const fetchCalculations = async () => {
                      const response = await fetch('http://localhost:3333/Calculations');
                      const calcData = await response.json();
                      setCalcsList(calcData);}
                      fetchCalculations();
                    },[])

    return (
      <li key={input.id}>
            <BtsInput
              input={input}
              changeInput={changeInput}
              handleClick={handleClick}
              handleInputFocus={handleInputFocus}
              calcsList={calcsList}
              lister={l}
              parser={w}/>
      </li>
    );
  };
  
  return (<ul>
              {
                inputs.map((x) => (renderInput(x,  changeInput, handleClick, handleInputFocus)))
              }
          </ul>);
};

export default InputList;