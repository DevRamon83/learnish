const successHandler = (response, data, setError) => {
  const { dispatch, navigate, setUser, setAuth } = data;
  setError(null);
  dispatch(setUser(response));
  dispatch(setAuth("authenticated"));
  navigate(`/user/dashboard/${response.id}`);
};

const finalizeAuth = (response, data, setError) => {
  const { strings } = data.errorStrings;
  if (response.error) {
    setError(strings[response.errorMessage]);
  } else {
    successHandler(response, data, setError);
  }
};

export default finalizeAuth;
