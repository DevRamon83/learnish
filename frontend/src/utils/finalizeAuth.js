const successHandler = (resp, data, setError) => {
  const { dispatch, navigate, setUser, setAuth } = data;

  setError(null);
  dispatch(setUser(resp));
  dispatch(setAuth("authenticated"));
  navigate(`/user/${resp.type}/${resp.id}`);
};

const finalizeAuth = (resp, data, setError) => {
  const { strings } = data;

  if (resp.error) {
    setError(strings[resp.errorMessage]);
  } else {
    successHandler(resp, data, setError);
  }
};

export default finalizeAuth;
