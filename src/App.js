import "./styles.css";
import InputList from "./components/InputList";
import {Row, Col, Container} from 'react-bootstrap';
import BtsNavbar from './components/BtsNavbar';
import { useState, useEffect, React } from "react";
import Button from "./components/Button";
import TextArea from "./components/TextArea";

export default function App() {
  const [inputs, setInputs] = useState([{ key: 1, inputText: "" }]);
  const [id, setId] = useState(2);
  const [activeInput, setActiveInput] = useState(inputs[0]);

  const changeActive = (input) =>
  {
    console.log('runs')
    console.log(input)

    const i = inputs.findIndex(x => x.key === input);
    setActiveInput(inputs[i]);
  };

  const changeInput = (input, text) => {
    const newInputs = [...inputs];
    const i = newInputs.findIndex((a) => a.key === input.key);
    newInputs[i].inputText = text;
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  const addInput = () => {
    setId(id + 1);
    const newInput = { key: id, inputText: "" };
    const newInputs = [...inputs];
    newInputs.push(newInput);
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  const removeInput = () => {
    if(inputs.length > 1)
    {
      setId(id - 1);
      const newInputs = inputs.slice(0, inputs.length - 1);
      Object.freeze(newInputs);
      setInputs(newInputs);
    }
  };

  return (
    <div className="App">
    <Container>
    <Row>
      <BtsNavbar /> 
    </Row>
    <Col md={12}>
      <Row className="fluid full" >
        <Col md={9}>
          <InputList
              inputs={inputs}
              changeInput={changeInput}
              handleActive={changeActive}
            />
            <>
              <section className="Buttons">
                <Button buttonText="Add Calc" InputAction={addInput} />
                <Button buttonText="Remove Calc" InputAction={removeInput} />
              </section>
            </>
          </Col>
          <Col md={3}>
              <TextArea className="fluid full" activeInput={activeInput}/>
          </Col>
      </Row>
     </Col>
    </Container>
    </div>
  );
}
