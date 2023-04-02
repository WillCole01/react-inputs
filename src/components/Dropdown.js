import DropdownOption from "./DropdownOption";
import partial  from "lodash/partial"; 
import { useState } from "react";

const Dropdown = ({wordList, leftPosition, width, showFirstN, textLength, input, changeInput, activeIndex}) => {

// const changeText = (val) => (partial(changeInput, input)) (val);

return(
  <div className="autocomplete-items" style={{zIndex: 5, position: "relative" }}  >
      <ul style={{"marginLeft":leftPosition.toString()+"lm", textAlign:"left",  backgroundColor:"white", 
                  color:"black", position: "relative", whiteSpace:"nowrap"}}>
        
        {wordList.map(
          (w, index ) => 
            (   
                <li key={index} style={{width:"100%", backgroundColor: (index == activeIndex ? "lightblue" : "white") }}>
                  <DropdownOption text={w} textLength={textLength} />
                </li>
            )
        ).slice(0, showFirstN)}
      </ul>
  </div>
  );
}

export default Dropdown;