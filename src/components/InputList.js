import  BtsInput  from "./btsInput";
import  {WordParser, Lister} from '../utils/CalcAutocompletion';
import {grammars,argument_mappings} from '../utils/AutocompleteData';
// import {AutocompleteData} from '../utils/AutocompleteDataJson.js';
// import { useState,useLayoutEffect } from "react";
// import { chunk } from "lodash";

const InputList = ({ inputs, calculationData, changeInput, handleClick, handleInputFocus}) => {

  const w = new WordParser();
  const l = new Lister(w,argument_mappings,grammars,calculationData)
  
  const renderInput = (input, changeInput ,handleClick) => {
    return (
      <li key={input.id}>
            <BtsInput
              input={input}
              changeInput={changeInput}
              handleClick={handleClick}
              handleInputFocus={handleInputFocus}
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