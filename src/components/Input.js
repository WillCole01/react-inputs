import React from "react";
import partial from "lodash/partial";

const Input = ({ input, changeInput }) => {
  // const handleChange = {};
  const changeText = partial(changeInput, input);

  return (
    <input input={input} onChange={(e) => changeText(e.target.value)}>
      {input.value}
    </input>
  );
};

export default Input;
