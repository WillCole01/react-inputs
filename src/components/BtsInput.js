import React from "react";
// import partial  from "lodash/partial"; // issue when destructured =? "partial"not recognised!
import  { Form }  from 'react-bootstrap';
import  Dropdown  from './Dropdown';
import { Card, CardBody } from "reactstrap";
import { useState } from "react";

const BtsInput = ({input, handleInputChange, handleInputClick, lister, parser}) => 
{
  // Setting the intellisense list
  const initialWordList = lister.getCalcsList();
  const defaultDropdownLength = 6;
  const [wordList, setWordList] = useState(initialWordList);
  const [filteredWords, setFilteredWords] = useState([]); // filteredWords
  const [textLength, setTextLength] = useState(0);

  // Dropdown state control
  const [activeIndex, setActiveIndex] = useState(0);
  const [listLength, setListLength] = useState(0);
  const [startIndex, setStartIndex ] = useState(0);
  const [endIndex, setEndIndex ]     = useState(6);

  //Updating text, clicking inputs
  // const changeText = (val) => ( partial(changeInput, input) ) (val); // don't want this to rerender when complete -> stopPropagation
  // const changeFocus = () => { handleInputFocus(input)};
  // const changeText = (input,val) => {handleInputChange(input,val)}
  const handleClick = (input) => { handleInputClick(input) }
  // const handleTextInput = (text) => { if(text === '') {setFilteredWords([]); setTextLength(0)} else { setFilteredWords(wordList.filter(c => c.toUpperCase().startsWith(text.toUpperCase()))); setTextLength(text.length);}}

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
          setListLength(0);
          break;    

      case ".":
        let index = parser.getAttributes(e.target.value).length;
        changeText(e.target.value);
        setListLength(0);
        if(e.target.value === '_.'){ setWordList(calcsList); }
        else { setWordList(lister.getNextAttribute(e.target.value, index)); }
        break;

      case "(":
        let attributes = w.getAttributes(e.target.value);
        let lastAttribute = attributes[attributes.length];
        changeText(e.target.value);
        setWordList(lister.getArguments(e.target.value, lastAttribute)); //matches current expression to pattern in order to find next dropdown list
        setListLength(Math.min(filteredWords.length, listLength));
        break;

      case ")":
        setWordList([]);
        setFilteredWords([]); 
        setListLength(0);
        break;

      default:
        if((e.keyCode > 46 && e.keyCode < 91) || e.keyCode == 189)
        {
          changeText(input, e.target.value);
          // handleTextInput(e.target.value);
          setListLength(Math.min(filteredWords.length,defaultDropdownLength));
        }
        break;
    }
    setTextLength(e.target.value.length);
  }


  return (
    <Card >
        <CardBody 
                  onClick={handleClick(input)} //(partial(handleClick, input))
                  style={{  cursor: "pointer", 
                            height:"100px"
                          }}
                  className={(input.isActive === true) ? "active-card" : "inactive-card"}>

          <Form.Group id={input.id} className="mb-3" controlId="formBasicText" >
            <Form.Control placeholder="Calc"
                          key={input.id}
                          onKeyUp={(e) => {handleInput(e)}}
                          value={input.inputText}
                          autoComplete="off"/>

          <Form.Text className="text-muted" ></Form.Text>
          </Form.Group> 
            < Dropdown wordList     =   {filteredWords}
                       startIndex   =   {startIndex}
                       endIndex     =   {Math.max(listLength, endIndex)}
                       leftPosition =   {textLength} // set to text length eventually
                       showFirstN   =   {Math.min(listLength,filteredWords.length)}
                       textLength   =   {textLength}
                       input        =   {input.value}
                       handleClick  =   {(input, e) => {handleInputChange(input, e.target.value); 
                                                  e.stopPropagation();}} //changeInput
                       activeIndex  =   {activeIndex} />
        </CardBody>
    </Card>
  );
};
//wordList, startIndex, endIndex, leftPosition, textLength, activeIndex
export default BtsInput;