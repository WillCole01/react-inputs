import "./styles.css";
import InputList from "./components/InputList";
import { useState, useEffect, React } from "react";
import Button from "./components/Button";

export default function App() {
  const [inputs, setInputs] = useState([{ key: 1, inputText: "" }]);
  const [id, setId] = useState(2);

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
    setId(id - 1);
    const newInputs = inputs.slice(0, inputs.length - 1);
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  return (
    <div className="App">
      <InputList
        inputs={inputs}
        changeInput={changeInput}
        addInput={addInput}
        removeInput={removeInput}
      />
      <>
        <section>
          <Button buttonText="Add Calc" InputAction={addInput} />
          <Button buttonText="Remove Calc" InputAction={removeInput} />
        </section>
      </>
    </div>
  );
}
