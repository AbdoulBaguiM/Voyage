const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  };
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  };
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  };
  const getUser = () => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("user"));
    }
  };
  const setUser = (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };
  const removeUser = () => {
    localStorage.removeItem("user");
  };
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  export default TokenService;