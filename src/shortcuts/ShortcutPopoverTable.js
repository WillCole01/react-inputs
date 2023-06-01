const ShortcutPopoverTable = ({ anchorEl, setAnchorEl, keyMap }) => {
  const shortcutsTable = Object.keys(keyMap).map((actionName) => {
    const { sequences, name } = keyMap[actionName];
    return (
      <TableRow key={name || actionName}>
        <TableCell>{name}</TableCell>
        <TableCell>
          {sequences.map((sequence) => (
            <span key={sequence}>{sequence}</span>
          ))}
        </TableCell>
      </TableRow>
    );
  });
  return (
    <Popover
      style={{ pointerEvents: "none" }}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      anchorEl={anchorEl}
      disableRestoreFocus
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Action</b>
            </TableCell>
            <TableCell>
              <b>Shortcut</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{shortcutsTable}</TableBody>
      </Table>
    </Popover>
  );
};

export default ShortcutPopoverTable;