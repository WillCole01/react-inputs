import {useEffect} from 'react';

const Dropdown = ({wordList, startIndex, endIndex, leftPosition, textLength, handleClick, activeIndex}) => {
  
  return(
          <div className="autocomplete-items" style={{zIndex: 5, position: "relative" }}  >
              <ul style={{"marginLeft":leftPosition.toString()+"lm", textAlign:"left",  backgroundColor:"white",  
                color:"black", position: "relative", whiteSpace:"nowrap"}}>
                {wordList.map(
                  (w, index ) => 
                    (   
                        <li key={index} style={index === activeIndex ? {backgroundColor:"Blue", color:"White"}  : {backgroundColor:"White"} } onClick={handleClick}> 
                                <p> <strong>{w.substr(0,textLength)}</strong>{w.substr(textLength, w.length)} </p>
                        </li>
                    )
                ).splice(startIndex, endIndex)}

              </ul>
          </div>
  );

}

export default Dropdown;