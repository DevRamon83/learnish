const successHandler = (response, data, setError) => {
  const { dispatch, navigate, setUser, setAuth } = data;
  setError(null);
  dispatch(setUser(response));
  dispatch(setAuth("authenticated"));
  navigate(`/user/dashboard/${response.id}`);
};

const finalizeAuth = (response, data, setError) => {
  if (response.error) {
    setError(data.standardError);
  } else {
    successHandler(response, data, setError);
  }
};

export default finalizeAuth;
