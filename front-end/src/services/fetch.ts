import { ITransactions } from "../interfaces/ITransactions";
import { IUser, IUserRequest } from "../interfaces/IUsers";

export async function createUser(data: IUserRequest) {
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

export async function login(data: IUserRequest) {
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

export async function cashOut(data: ITransactions, token: string) {
  const url = 'http://localhost:3001/transactions/cash-out';

  const dataJson = JSON.stringify({
    ...data,
    value: Number(data.value)
  });

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);

  const transaction = await response.json();
  return transaction;
};

export async function getBalance(token: string) {
  const url = 'http://localhost:3001/users/get-user';

  const obj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`,
    },
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user as IUser;
};

export async function getHistoric(query: string, token: string) {
  const url = `http://localhost:3001/transactions/?filter=${query}`;

  const obj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await fetch(url, obj);
  const historic = await response.json();
  return historic;
};