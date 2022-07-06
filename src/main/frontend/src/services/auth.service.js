import axios from "axios";
import Router from "next/router";

const register = (email, name, lastName, telephone, pays, avatar, password) => {
  return axios
  .post(`${process.env.API_BASE_URL}/auth/signup` , {
    email,
    name,
    lastName,
    telephone,
    pays,
    avatar,
    password,
    roles : []
  });
};


const login = (email, password) => {
  return axios
    .post(`${process.env.API_BASE_URL}/auth/signin`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        
        if(response.data.roles.includes('ROLE_ADMIN'))
          Router.push('/admin');
        else
          Router.push('/');
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  Router.push('/');
};

const getCurrentUser = () => {
if (typeof window !== 'undefined') {
    console.log('You are on the browser')
        return JSON.parse(localStorage.getItem("user"));
}
};

const checkRoles = (roles) => {
  roles.map((role)=> {
    if(role["id"] == 1)
      return true;
    else
      if(role["id"] == 3)
        return true;
    return false;
  })
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  checkRoles,
};

export default AuthService;