const ChangingShortcutDialog = ({ changingActionShortcut, keyMap }) => {
  const { name } = changingActionShortcut;
  const description = keyMap[name].name;
  const { cancel } = changingActionShortcut;
  return (
    <Dialog open={Boolean(changingActionShortcut)} onClose={cancel}>
      <DialogTitle>
        Press the key or keys you would like to bind to "{description}".
      </DialogTitle>
      <DialogActions>
        <Button onClick={cancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangingShortcutDialog;