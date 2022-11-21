import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/fetch';
import '../styles/login-register.css'

function Register() {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
  });

  const [notification, setNotification] = useState({
    errorName: '',
    errorPassword: '',
    validUser: false,
    validPassword: false,
  });

  const [createInfo, setCreateInfo] = useState({
    message: '',
  })


  const navigate = useNavigate();

  function checkPassword() {
    const { password } = registerData
    const regex = /[0-9]/;

    const noLower = password !== password.toLowerCase();
    const lenght = password.length >= 8;
    const hasNumber = regex.test(password);

    if (!noLower) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter uma letra maiúscula',
        validPassword: false,
      })
    } else if (!lenght) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter pelo menos 8 caracteres',
        validPassword: false,
      })
    } else if (!hasNumber) {
      setNotification({
        ...notification,
        errorPassword: 'Senha precisa ter pelo menos um número',
        validPassword: false,
      })
    } else {
      setNotification({
        ...notification,
        errorPassword: '',
        validPassword: true,
      })
    }
  }

  function validate() {
    const { username } = registerData
    if (username.length < 3) {
      setNotification({
        ...notification,
        errorName: 'Nome de usuário precisa ter pelo menos 3 caracteres',
        validUser: false
      })
    } else {
      setNotification({
        ...notification,
        errorName: '',
        validUser: true
      })
    }

  }

  async function sendUser() {
    const user = await createUser(registerData);

    if (user.message) {
      setCreateInfo({
        message: user.message,
      });
    } else {
      setCreateInfo({
        message: 'Conta criada com sucesso!',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
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


  const { username, password } = registerData
  return (
    <main className='login-register-container'>
      <section className='title-container'>
        <h1>Boas vindas ao Bankin</h1>
      </section>
      <section className='forms-container'>
        <h1>Cadastre-se</h1>
        <form>
          <div className='input-elem'>
            <label htmlFor='userName'>Nome de usuário</label>
            <input
              type='text'
              value={username}
              placeholder='Usuário'
              id='userName'
              onBlur={() => validate()}
              onChange={({ target }) => setRegisterData({ ...registerData, username: target.value })}
            />
          </div>
          {
            notification.errorName.length > 0 && (
              <p className='warn'>
                {notification.errorName}
              </p>
            )
          }
          <div className='input-elem'>
            <label htmlFor='password'>Senha</label>
            <input
              type='text'
              value={password}
              placeholder='Senha'
              id='password'
              onBlur={() => checkPassword()}
              onChange={({ target }) => setRegisterData({ ...registerData, password: target.value })}
            />
          </div>

          {
            notification.errorPassword.length > 0 && (
              <p className='warn'>
                {notification.errorPassword}
              </p>
            )
          }

          <div className='redirect-link-element'>
            <p>
              <Link to='/login'>Já tenho conta</Link>
            </p>
          </div>

          <div className='btn-element'>
            <button
              type='submit'
              onClick={(event) => {
                stopEvent(event)
              }}
            >
              Entrar
            </button>
          </div>
          {
            createInfo.message.length > 0 && (
              <p>{createInfo.message}</p>
            )
          }
        </form>
      </section>
    </main>
  )
}

export default Register;