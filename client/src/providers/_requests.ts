import axios from "axios";
import { AuthModel, UserModel } from "./_models";
import { Base64 } from 'js-base64';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string, role: string = 'user') {
  const encryptedPassword = Base64.encode(password);

  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password: encryptedPassword,
    role
  });
}

export function simulateLogin(email: string) {
  console.log('Simulating login', email)
  return axios.post<AuthModel>( `${API_URL}/simulate/login`, {
    email: email
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string,
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
