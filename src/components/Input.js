import React from "react";
import partial from "lodash/partial";
import {Card, Form} from 'react-bootstrap';
//handleActive
const Input = ({ input, changeInput }) => {
  
  const changeText = partial(changeInput, input);

  return (
    <Card>
      <Card.Body>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control placeholder="Calc"
                      key={input.key}
                      onClick={partial(changeInput, input)}
                      onChange={(e) => changeText(e.target.value)}
                      value={input.value} />
          <Form.Text className="text-muted" >
          </Form.Text>
      </Form.Group>
      </Card.Body>
  </Card>

    // const handleChange = {};
    // <input input={input} onChange={(e) => changeText(e.target.value)}>
    //   {input.value}
    // </input>
    // onClick = {handleClick}

  );
};

export default Input;
