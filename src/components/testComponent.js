const Button = ({ buttonText, handleCLick, backgroundColor}) => {
  return (<button onClick={handleCLick} 
          style={{  backgroundColor: {backgroundColor} ? "green" : "red"}}>{buttonText}</button>);
};

export default Button;
