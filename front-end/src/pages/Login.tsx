import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/fetch';
import { setUserOnStorage } from '../services/sessionStorage';
import '../styles/login-register.css';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [notification, setNotification] = useState({
    errorName: '',
    errorPassword: '',
    validUser: false,
    validPassword: false,
  });

  const [loginInfo, setLoginInfo] = useState({
    message: '',
  });

  const navigate = useNavigate();

  function checkPassword() {
    const { password } = loginData;
    const regex = /[0-9]/;

    const noLower = password !== password.toLowerCase();
    const lenght = password.length >= 8;
    const hasNumber = regex.test(password);

    if (!noLower) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter uma letra maiúscula',
        validPassword: false,
      });
    } else if (!lenght) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter pelo menos 8 caracteres',
        validPassword: false,
      });
    } else if (!hasNumber) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter pelo menos um número',
        validPassword: false,
      });
    } else {
      setNotification({
        ...notification,
        errorPassword: '',
        validPassword: true,
      });
    }
  }

  function validate() {
    const { username } = loginData

    if (username.length < 3) {
      setNotification({
        ...notification,
        errorName: 'Nome de usuário precisa ter pelo menos 3 caracteres',
        validUser: false
      });
    } else {
      setNotification({
        ...notification,
        errorName: '',
        validUser: true
      });
    }
  }

  async function sendUser() {
    const user = await login(loginData);

    if (user.message) {
      setLoginInfo({
        message: user.message,
      });
    } else {
      setUserOnStorage(user.token);

      navigate('/home');
    }

  }

  function stopEvent(event: React.MouseEvent) {
    event.preventDefault();
    const { validUser, validPassword } = notification;

    if (!validUser) {
      validate();
    } else if (!validPassword) {
      checkPassword();
    } else {
      sendUser();
    }

  }

  const { username, password } = loginData;

  return (
    <main className='login-register-container'>
      <section className='title-container'>
        <h1>Olá de novo!</h1>
      </section>

      <section className='forms-container'>
        <h1>Login</h1>
        <form>
          <div className='input-elem'>
            <label htmlFor='userName'>Nome de usuário</label>
            <input
              type='text'
              value={ username }
              placeholder='Usuário'
              id='userName'
              onBlur={ () => validate() }
              onChange={ ({ target }) => setLoginData({ ...loginData, username: target.value }) }
            />
          </div>

          {
            notification.errorName.length > 0 && (
              <p className='warn'>
                { notification.errorName }
              </p>
            )
          }

          <div className='input-elem'>
            <label htmlFor='password'>Senha</label>
            <input
              type='text'
              value={ password }
              placeholder='Senha'
              id='password'
              onBlur={ () => checkPassword() }
              onChange={ ({ target }) => setLoginData({ ...loginData, password: target.value }) }
            />
          </div>

          {
            notification.errorPassword.length > 0 && (
              <p className='warn'>
                { notification.errorPassword }
              </p>
            )
          }

          <div className='redirect-link-element'>
            <p>
              <Link to='/register'>Quero uma conta</Link>
            </p>
          </div>

          <div className='btn-element'>
            <button
              type='submit'
              onClick={ (event) => {
                stopEvent(event);
              }}
            >
              Entrar
            </button>
          </div>

          {
            loginInfo.message.length > 0 && (
              <p className='alert'>{ loginInfo.message }</p>
            )
          }

        </form>
      </section>
    </main>
  )
}

export default Login;