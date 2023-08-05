import  BtsInput  from "./btsInput";
import  {WordParser, Lister} from '../utils/CalcAutocompletion';
import {grammars,argument_mappings} from '../utils/AutocompleteData';
// import {AutocompleteData} from '../utils/AutocompleteDataJson.js';
// import { useState,useLayoutEffect } from "react";
// import { chunk } from "lodash";

const InputList = ({ inputs, handleInputChange, handleInputClick, handleInputFocus, calculationData}) => {
  
  const w = new WordParser();
  const l = new Lister(w,argument_mappings,grammars,calculationData)

  return (
          <ul>
          {inputs.map((x, key) => (
                  <li key={key}>
                          <BtsInput
                            input={x}
                            handleInputChange={handleInputChange}
                            handleInputClick ={handleInputClick}
                            handleInputFocus ={handleInputFocus}
                            lister={l}
                            parser={w}/>
                    </li>       
              ))
            }
          </ul>
        )
    }

export default InputList;