const Button = ({ buttonText, InputAction }) => {
  return <button onClick={InputAction}>{buttonText}</button>;
};

export default Button;
