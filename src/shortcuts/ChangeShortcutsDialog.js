import ChangeShortcutsDialog from './ChangeShortcutsDialog.js';

const ChangeShortcutsDialog = ({
  showShortcutsDialog,
  setShowShortcutsDialog,
  changingActionShortcut,
  setChangingActionShortcut,
  showChangeShortcutDialog,
  keyMap,
}) => {
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
        <TableCell>
          <IconButton
            onClick={() => {
              setChangingActionShortcut({ name: actionName });
              showChangeShortcutDialog(actionName);
            }}
            color="primary"
            variant="contained"
          >
            <EditRegionIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });
  return (
    <Dialog
      open={showShortcutsDialog || changingActionShortcut}
      onClose={() => {
        setShowShortcutsDialog(false);
      }}
    >
      <DialogTitle>Keyboard shortcuts</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Action</b>
              </TableCell>
              <TableCell>
                <b>Shortcut</b>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{shortcutsTable}</TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeShortcutsDialog;