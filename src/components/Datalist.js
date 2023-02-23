const Datalist = ({DropdownList, Identifier}) =>
{
    const renderOption = (option) =>
    {
        return (<option>{option}</option>);
    };

    return (
                <datalist id={Identifier}>
                    {DropdownList.map(x => renderOption(x))}
                </datalist>)
};

export default Datalist;
