import Router from "next/router";
import api from "./api";
import TokenService from "./token.service";

const register = (email, name, lastName, telephone, pays, avatar, password) => {
  return api
  .post('/auth/signup' , {
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
  return api
    .post('/auth/signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        
        if(response.data.roles.includes('ROLE_ADMIN'))
          Router.push('/admin');
        else
          Router.push('/');
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
  Router.push('/');
};

const getCurrentUser = () => {
  return TokenService.getUser();
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