import {useEffect} from 'react';

const Dropdown = ({wordList, startIndex, endIndex, leftPosition, textLength, activeIndex}) => {
  
  useEffect(() => 
    {console.log("start index: " + startIndex.toString() + " end index: " + endIndex.toString() + " activeIndex: " + activeIndex.toString())},
    [startIndex,endIndex,activeIndex]
  )
  
  return(
  <div className="autocomplete-items" style={{zIndex: 5, position: "relative" }}  >
      <ul style={{"marginLeft":leftPosition.toString()+"lm", textAlign:"left",  backgroundColor:"white",  
        color:"black", position: "relative", whiteSpace:"nowrap"}}>
        {wordList.map(
          (w, index ) => 
            (   
                <li key={index} style={index === activeIndex ? {backgroundColor:"Blue", color:"White"}  : {backgroundColor:"White"} }> 
                        <p> <strong>{w.substr(0,textLength)}</strong>{w.substr(textLength, w.length)} </p>
                </li>
            )
        ).splice(startIndex, endIndex)}

      </ul>
  </div>
  );
}

export default Dropdown;