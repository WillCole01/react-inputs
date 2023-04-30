const Button = ({ buttonText, handleCLick}) => {
  return (<button onClick={handleCLick}>{buttonText}</button>);
};

export default Button;
