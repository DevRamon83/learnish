export default function Deactivate({ contractProps, props }) {
  const { classes } = props;
  const { deactivate, setDeactivate } = contractProps;

  const deactivateHandler = () => {
    setDeactivate(true);
  };

  return (
    <>
      {!deactivate && (
        <div className={classes.settings.trash} onClick={deactivateHandler} />
      )}
    </>
  );
}
