const CustomDatalistItem = ({itemText, inputVal,handleItemClick}) =>
{   
    
    
    return(
        <div onClick={handleItemClick}>
            <strong> {itemText.substr(0, inputVal.length)}</strong>{itemText.substr(inputVal.length)}
            <input type='hidden' value={itemText}></input>
        </div>
    );
};

export default CustomDatalistItem;
