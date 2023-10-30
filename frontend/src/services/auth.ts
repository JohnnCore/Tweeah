import axios from 'axios';

import { AuthReducerAction, AuthReducerActionType } from '../context/authContext';

type PropsType = {
  dispatch: React.Dispatch<AuthReducerAction>,
  AUTH_ACTIONS: AuthReducerActionType,
  email?: string,
  password?: string,
  username?: string,
}

export const login = async ({ dispatch, email, password, AUTH_ACTIONS }: PropsType) => {
  try {
    const datapost = {
      email: email,
      password: password,
    }
    const response = await axios.post('http://127.0.0.1:8000/api/users/token/', datapost);

    const { access, refresh } = response.data;

    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        accessToken: access,
        refreshToken: refresh,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};

export const register = async ({dispatch, email, username, password, AUTH_ACTIONS}: PropsType) => {
  try{
    const datapost = {
      email: email,
      username: username,
      password: password,
    }
    const response = await axios.post('http://127.0.0.1:8000/api/users/register/', datapost)

    console.log(response);
    dispatch({
      type:AUTH_ACTIONS.REGISTER,
    });
    
  } catch(error) {
    console.error('Erro ao fazer register:', error);
  }
}

export const logout = async({dispatch, AUTH_ACTIONS}:PropsType) => {
  try{
    dispatch({
      type:AUTH_ACTIONS.LOGOUT,
    })
  }catch(error) {
    console.error('Erro ao fazer logout:', error);
  }
}

