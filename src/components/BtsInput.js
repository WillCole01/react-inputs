import React from "react";
import partial  from "lodash/partial"; // issue when destructured =? "partial"not recognised!
import  { Form }  from 'react-bootstrap';
import  Dropdown  from './Dropdown';
import { Card, CardBody } from "reactstrap";
import { useState } from "react";

const BtsInput = ({input, changeInput, handleClick, 
                   handleInputFocus, calcsList, lister, parser }) => 
{

  const initialWordList = lister.getInitialList();

  const [wordList, setWordList] = useState(initialWordList);
  const [filteredWords, setFilteredWords] = useState(initialWordList); // filteredWords
  const [textLength, setTextLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const firstN = 6;
  
  const changeText = (val) => ( partial(changeInput, input)) (val);
  const changeFocus = () => { handleInputFocus(input) ;};

  const handleTextInput = (text) => { let newList = wordList.filter(c => c.toUpperCase().startsWith(text.toUpperCase()));
                                      setFilteredWords(newList);
                                      setTextLength(text.length);}

  const handleInput = (e) => {
    const wordListLength = Math.min(filteredWords.length,firstN);
    
    switch (e.key){
      case "ArrowDown" && (activeIndex < wordListLength):
        setActiveIndex(activeIndex + 1);
        break; 

      case "ArrowUp" && (activeIndex > 0):
        setActiveIndex(activeIndex - 1);
        break;

      case "Enter":
        changeText(filteredWords[activeIndex]); 
        setWordList([]);
        setFilteredWords([]); 
        setActiveIndex(0);
        break;
      
      case ".":
        let index = parser.getAttributes(e.target.value).length;
        changeText(e.target.value);
        if(e.target.value === '_.')
        {
          setWordList(calcsList);
        }
        else
        {
          setWordList(lister.getNextAttribute(e.target.value, index));
        }
        break;

      case "(":
        let attributes = w.getAttributes(e.target.value);
        let lastAttribute = attributes[attributes.length];
        changeText(e.target.value);
        setWordList(lister.getArguments(e.target.value, lastAttribute)); //matches current expression to pattern in order to find next dropdown list
        break;

      case ")":
        setWordList([]);
        setFilteredWords([]); 
        break;

      default:
        changeText(e.target.value);
        handleTextInput(e.target.value);

      break;
    }
    setTextLength(e.target.value.length);
  }


  return (
    <Card >
        <CardBody onClick={(partial(handleClick, input))}
                  style={{  cursor: "pointer", 
                            height:"100px"
                          }}
                  className={(input.isActive === true) ? "active-card" : "inactive-card"}>

          <Form.Group id={input.id} className="mb-3" controlId="formBasicText" >
            <Form.Control placeholder="Calc"
                          key={input.id}
                          // onClick={(e) => {handleFormClick(e)}}
                          onFocus={()  => { changeFocus() }   }
                          onChange={(e) => { handleInput(e)}   }
                          value={input.inputText}
                          autoComplete="off"
                          />
          <Form.Text className="text-muted" ></Form.Text>
          </Form.Group>
            < Dropdown wordList={filteredWords}
                       leftPosition={textLength} // set to text length eventually
                       showFirstN={(filteredWords.length > 0) ? firstN : 0 }
                       textLength={textLength}
                       input={input.value}
                       changeInput={changeInput}
                       activeIndex={activeIndex} />
        </CardBody>
    </Card>
  );
};

export default BtsInput;