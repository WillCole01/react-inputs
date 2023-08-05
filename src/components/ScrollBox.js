import {React } from "react"; //useCallback,useState,
import InputList from "./InputList";
import {useFetch} from 'use-http';
import { useEffect, useState } from "react";

const ScrollBox = ({ inputs, handleChangeInput, handleInputActivate, handleInputFocus}) => {

  
  const [calcs, setCalcs] = useState();
  const { get,post,response,loading,error } = useFetch('http://localhost:4000');


  // const handleChangeInput = (input, wording) =>  {  handleChangeInput(input, wording) }; //wording
  // const handleInputActivate = (input) =>  {  handleInputActivate(input) };
  // const handleInputFocus = (input) =>  {  handleInputFocus(input);  };

  async function loadCalcs(){ const calcsData = await get('/Calculations');
                              if (response.ok) {
                                setCalcs(calcsData);
                              }
                            }
                            
  useEffect(() => {loadCalcs()},[]);
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  
  return (
    <div className="overflow-auto ScrollBox">
    {calcs && 
      
            <InputList inputs={inputs} 
                       handleChangeInput={handleChangeInput}  
                       handleInputActivate={handleInputActivate}  
                       handleInputFocus={handleInputFocus} 
                       calculationData={calcs}
            />
      
    }
    </div>
  );
                              
};

export default ScrollBox;