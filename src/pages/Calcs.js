import "../styles.css";
import {React } from "react"; //useCallback,useState,
import {Row, Col } from 'react-bootstrap'; //Containers

// autocomplete data
import '../utils/Globals.js';

// components
import ScrollBox from "../components/ScrollBox";
import TextArea from "../components/TextArea";
import RunCard from "../components/RunCard";

const Calcs = ({inputs, changeInput, inputActivate}) => {

  // init app data 
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};

  const handleChangeInput = (input, wording) =>  { changeInput(input, wording) };
  const handleInputActivate = (input) =>  { inputActivate(input) };

  return (
    <div className="App">
          <Row>
            <RunCard informationMap={RunInformationData} />
          </Row>
          <Col md={12}>
            <Row className="fluid full" >
              <Col md={9}>
                    <ScrollBox inputs={inputs} changeInput={handleChangeInput} handleClick={handleInputActivate}/>
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