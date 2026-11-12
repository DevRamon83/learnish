export default function Deactivate({ contractProps, props }) {
  const { classes } = props;
  const { deactivate, setDeactivate } = contractProps;

  const deactivateHandler = () => {
    setDeactivate(true);
  };

  return (
    <>
      {!deactivate && (
        <button
          className={classes.settings.trash}
          onClick={deactivateHandler}
        />
      )}
    </>
  );
}
