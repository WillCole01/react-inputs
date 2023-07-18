import React from "react";
import partial  from "lodash/partial"; // issue when destructured =? "partial"not recognised!
import  { Form }  from 'react-bootstrap';
import  Dropdown  from './Dropdown';
import { Card, CardBody } from "reactstrap";
import { useState } from "react";

const BtsInput = ({input, changeInput, handleClick, handleInputFocus, lister, parser }) => 
{

  // Setting the intellisense list
  const initialWordList = lister.getCalcsList();
  const [wordList, setWordList] = useState(initialWordList);
  const [filteredWords, setFilteredWords] = useState([]); // filteredWords
  const [textLength, setTextLength] = useState(0);

  // Dropdown state control
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstN, setFirstN] = useState(0);
  const [startIndex, setStartIndex ] = useState(0);
  const [endIndex, setEndIndex ]     = useState(6);

  //Updating text, clicking inputs
  const changeText = (val) => ( partial(changeInput, input)) (val);
  const changeFocus = () => { handleInputFocus(input)};
  const handleTextInput = (text) => { if(text === '') {setFilteredWords([]); setTextLength(0)} else { setFilteredWords(wordList.filter(c => c.toUpperCase().startsWith(text.toUpperCase()))); setTextLength(text.length);}}

  const handleInput = (e) => {
   switch (e.key)
   {
      case ("ArrowDown"):
        if(activeIndex < filteredWords.length)
        {
          if(activeIndex === endIndex)
          {
            setStartIndex(startIndex + 1);
            setEndIndex(endIndex + 1);
          }
          setActiveIndex(activeIndex + 1);
        }
        break;

      case ("ArrowUp"):
        if(activeIndex > 0)
        {
          if(activeIndex === startIndex)
          {
            setStartIndex(startIndex - 1);
            setEndIndex(endIndex - 1);
          }
          setActiveIndex(activeIndex - 1);
        }
        break;

      case "Enter":
        changeText(filteredWords[activeIndex]); 
        setWordList([]);
        setFilteredWords([]); 
        setActiveIndex(0);
        setFirstN(0);
        break;
      
      case ".":
        let index = parser.getAttributes(e.target.value).length;
        changeText(e.target.value);
        setFirstN(0);
        if(e.target.value === '_.'){ setWordList(calcsList); }
        else { setWordList(lister.getNextAttribute(e.target.value, index)); }
        break;

      case "(":
        let attributes = w.getAttributes(e.target.value);
        let lastAttribute = attributes[attributes.length];
        changeText(e.target.value);
        setWordList(lister.getArguments(e.target.value, lastAttribute)); //matches current expression to pattern in order to find next dropdown list
        setFirstN(Math.min(filteredWords.length, firstN));
        break;

      case ")":
        setWordList([]);
        setFilteredWords([]); 
        setFirstN(0);
        break;

      default:
        changeText(e.target.value);
        handleTextInput(e.target.value);
        setFirstN(Math.min(filteredWords.length,firstN));
        setCharacter(e.target.value[(e.target.value.length - 1)]);
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
                          onFocus={()  => {changeFocus()}}
                          onKeyDown={(e) => {handleInput(e) }}
                          value={input.inputText}
                          autoComplete="off"
                          />
          <Form.Text className="text-muted" ></Form.Text>
          </Form.Group>
            < Dropdown wordList={filteredWords}
                       startIndex={startIndex}
                       endIndex  ={Math.max(firstN, endIndex)}
                       leftPosition={textLength} // set to text length eventually
                       showFirstN={Math.min(firstN,filteredWords.length)}
                       textLength={textLength}
                       input={input.value}
                       changeInput={changeInput}
                       activeIndex={activeIndex} />
        </CardBody>
    </Card>
  );
};

export default BtsInput;