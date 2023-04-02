const DropdownOption = ({text, textLength}) => {
  return(
      <p>
        <strong>{text.substr(0,textLength)}</strong>{text.substr(textLength, text.length)}
      </p>
    );
}

export default DropdownOption;