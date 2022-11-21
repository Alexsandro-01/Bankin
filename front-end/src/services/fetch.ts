import { IUser } from "../interfaces/IUsers";

export async function createUser(data: IUser) {
  const url = 'http://localhost:3001/users/create';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};

export async function login(data: IUser) {
  const url = 'http://localhost:3001/users/login';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};