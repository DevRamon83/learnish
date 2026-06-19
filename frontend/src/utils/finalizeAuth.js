const successHandler = (resp, data, setError) => {
  const { dispatch, navigate, setUser, setAuth } = data;
  const { response } = resp;
  setError(null);
  dispatch(setUser(response));
  dispatch(setAuth("authenticated"));
  navigate(`/user/${response.type}/${response.id}`);
};

const finalizeAuth = (response, data, setError) => {
  const { errorStrings } = data;

  if (response.error) {
    setError(errorStrings.strings[response.errorMessage]);
  } else {
    successHandler(response, data, setError);
  }
};

export default finalizeAuth;
