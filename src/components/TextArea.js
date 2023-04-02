import React from 'react';
import {Form} from 'react-bootstrap';

const TextArea = () => {
  return (
      <div>
      <Form style={{margin: '5px'}} autoComplete="off">
            <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows="3" style={{height: '90vh', resize:'none'}} name="address"/>
              </Form.Group>
        </Form>
    </div>
  );
}

export default TextArea;