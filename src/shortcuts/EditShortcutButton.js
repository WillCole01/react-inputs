const EditShortcutButton = ({
  showShortcutsDialog,
  setShowShortcutsDialog,
  setAnchorEl,
}) => {
  return (
    <Button
      startIcon={<KeyboardIcon />}
      onClick={() => {
        setShowShortcutsDialog(!showShortcutsDialog);
      }}
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
      variant="outlined"
      color="default"
    >
      Shortcuts
    </Button>
  );
};

export default EditShortcutButton;