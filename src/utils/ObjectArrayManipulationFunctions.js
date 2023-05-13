
export const updateInputAttributeFromId = (inputs, id=NaN, attribute, newValue) => {
    for (let object of inputs) {
      if (!isNaN(id) && object.id === id) {
          object[attribute] = newValue;
      }
      else if(isNaN(id))
      {
        object[attribute] = newValue;
      }
    }
    return;
  }
  
  export const updateInputAttributeFromIndex = (inputs, index=NaN, attribute, newValue) => {
    let arrayIndex = 0;
    for (let object of inputs) {
      if (!isNaN(index) && arrayIndex === index) 
      {
          object[attribute] = newValue;
      }
      else if(isNaN(index))
      {
        object[attribute] = newValue;
      }
      arrayIndex++;
    }
    return;
  }
  
  export const readInputAttribute = (inputs, id, attribute) => {
    let index = inputs.findIndex((input) => input.id === id);
    return inputs[index][attribute];
  }
  
  export const getFirstInputIdWithAttributeValue = (inputs,attribute,value,returnAttribute) => {
    for (let object of inputs) {
      if(object[attribute] === value)
      {
        return object[returnAttribute];
      }
    }
  }
  
  export const getFirstInputIndexWithAttributeValue = (inputs,attribute,value) => {
    let i = 0;
    for (let object of inputs) {
      if(object[attribute] === value)
      {
        return i;
      }
      i++;
    }
  }
  
//   export updateInputAttributeFromId,updateInputAttributeFromIndex,getFirstInputIndexWithAttributeValue,getFirstInputIdWithAttributeValue,readInputAttribute;