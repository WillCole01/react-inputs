import InputList from "./InputList";
import {useFetch} from 'use-http';
import { useEffect, useState } from "react";

const ScrollBox = ({ inputs, changeInput, handleClick, handleInputFocus}) => {
  
  const [calcs, setCalcs] = useState();
  const { get,post,response,loading,error } = useFetch('http://localhost:4000');

  useEffect(() => {loadCalcs()},[]);
  async function loadCalcs(){ const calcsData = await get('/Calculations');
                              if (response.ok) {
                                setCalcs(calcsData);
                              }
                            }

  return (
      <div className="overflow-auto ScrollBox">
        {loading && "... loading"}
        {error && "... error"}
        {
          calcs 
          &&
            <InputList
               inputs={inputs} 
               calculationData={calcs}
               changeInput={changeInput} 
               handleClick={handleClick} 
               handleInputFocus={handleInputFocus}
               />}
      </div>
  );
};

export default ScrollBox;