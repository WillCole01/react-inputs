import React from "react";
import partial  from "lodash/partial"; // issue when destructured =? "partial"not recognised!
import  { Form }  from 'react-bootstrap';
import  Dropdown  from './Dropdown';
import { Card, CardBody } from "reactstrap";
import { useState } from "react";
import { HotKeys } from "react-hotkeys";
import {HotKeysPreventDefaults} from '../utils/HotkeysPreventDefaults';

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba",
"Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia",
"Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
"Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
"Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands",
"Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada",
"Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel",
"Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
"Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
"Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
"Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
"Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
"Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates",
"United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const BtsInput = ({input, changeInput, handleClick}) => {

  const [filteredWords, setFilteredWords] = useState(['']); // filteredWords
  const [textLength, setTextLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const firstN = 6;
  const changeText = (val) => (partial(changeInput, input)) (val);


  const handleKeyInput = (e) => {
    const key = e.key;
    const wordListLength = Math.min(filteredWords.length,firstN);

    if (key == "ArrowDown") {
      console.log("ArrowDown");
      if(activeIndex < wordListLength)
      {
        setActiveIndex(activeIndex + 1)
      }
    }
    else if (key === "ArrowUp") {
      console.log("ArrowUp");
      if(activeIndex > 0)
      {
       setActiveIndex(activeIndex - 1)
      }
    }
    else if(key == "Enter")
    {
      console.log("Enter");
      changeText(filteredWords[activeIndex]);
      setFilteredWords([]);
      setActiveIndex(0);
      // e.stopPropagation();
    }
  }

  const hotkeyhandler = HotKeysPreventDefaults({
    'optionSelect': ()  => {   console.log('optionSelect'); },
    'nextDropdown': () => {  console.log('nextDropdown'); },
    'selectOption': () => { console.log('selectOption'); },
    'selectUp':() => {console.log('selectUp');},
    'selectDown': () => { console.log('selectDown'); } });

const hotkeymap = {'optionSelect': 'leftBracket',
                   'nextDropdown':'fullStop',
                   'selectOption': 'Enter',
                   'selectUp': 'ArrowUp',
                   'selectDown': 'ArrowDown'};

  const handleTextInput = (text) => 
  {
    if(text.length == 0)
    {
      setFilteredWords([]);
      setTextLength(0);
    }
    else
    {
        let newList = countries.filter(c => c.toUpperCase().startsWith(text.toUpperCase()));
        setFilteredWords(newList);
        setTextLength(text.length);
    }
  }

  const handleInput = (e) => {
    // console.log("this is the key:" + e.key);
    if(["ArrowUp", "ArrowDown", "Enter"].indexOf(e.key) != -1)
    {
      handleKeyInput(e);
    }
    else
    {
      handleTextInput(e.target.value);
    }
    
  }

  // console.log("This is the input in BtsInput: ");
  // console.log(input);
  // console.log("BtsInput inputText Length: " + input.inputText.length);

  return (
    <Card >
        <CardBody onClick={(partial(handleClick, input))}
                  style={{  cursor: "pointer", 
                            height:"100px"
                          }}
                  className={(input.isActive === true) ? "active-card" : "inactive-card"}>

          <Form.Group id={input.id} className="mb-3" controlId="formBasicText" >
          <HotKeys keyMap={hotkeymap} handlers={hotkeyhandler}>
            <Form.Control placeholder="Calc"
                          key={input.id}
                          onClick={(e) => {e.stopPropagation()}}
                          onChange={(e) => changeText(e.target.value)}
                          onKeyUp={(e) => handleInput(e)}
                          value={input.inputText}
                          autoComplete="off"
                          />
          </HotKeys>
              <Form.Text className="text-muted" >
              </Form.Text>
          </Form.Group>
            < Dropdown wordList={filteredWords} 
                       leftPosition={0} 
                       showFirstN={(filteredWords.length > 0) ? firstN : 0 }
                       textLength={input.inputText.length}
                       input={input.value}
                       changeInput={changeInput}
                       activeIndex={activeIndex} />
        </CardBody>
    </Card>
  );
};

export default BtsInput;