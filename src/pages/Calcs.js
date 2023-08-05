import "../styles.css";
import {React } from "react"; //useCallback,useState,
import {Row, Col } from 'react-bootstrap'; //Containers

// autocomplete data
import '../utils/Globals.js';

// components
import ScrollBox from "../components/ScrollBox";
import TextArea from "../components/TextArea";
import RunCard from "../components/RunCard";

const Calcs = ({inputs, handleChangeInput, handleInputActivate, handleInputFocus}) => {

  // init app data 
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};

  // const handleChangeInput = (input, wording) =>  {  handleChangeInput(input, wording) }; //wording
  // const handleInputActivate = (input) =>  {  handleInputActivate(input) };
  // const handleInputFocus = (input) =>  {  handleInputFocus(input);  };

  return (
    <div className="App">
          <Row>
            <RunCard informationMap={RunInformationData} />
          </Row>
          <Col md={12}>
            <Row className="fluid full" >
              <Col md={9}>
                    <ScrollBox inputs={inputs} handleChangeInput={handleChangeInput} handleInputActivate={handleInputActivate} handleInputFocus={handleInputFocus}/>
              </Col>
        
              <Col md={3}>
                  <TextArea className="fluid full"/>
              </Col>
        
            </Row>

          </Col>
    </div>
  );
};

export default Calcs;