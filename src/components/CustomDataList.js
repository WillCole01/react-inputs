import CustomDatalistItem from "./CustomDataListItem";

const CustomDatalist = ({autocompleteItems, val}) =>
{   
    const handleItemClick = (listItem, Input ) =>
    {
        Input.value = listItem.value;
        closeAllLists();
    };

    const renderItemsList = (items, val, handleItemClick) => {
            items.filter((x) => x.startsWith(val))
                 .map( x =>
                            {
                                <CustomDatalistItem itemText={x} inputVal={val} handleItemClick={handleItemClick}/>
                            });
    
    };

    return(
        <div id="autocomplete-list"  className="autocomplete-items">
            renderItemsList(items={autoCompleteItems}, val={val});
        </div>
    );
};

export default CustomDatalist;
