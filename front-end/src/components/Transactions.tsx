import React, { useState } from 'react';
import { ITransactionprops } from '../interfaces/ITransactions';
import { cashOut } from '../services/fetch';
import { getUserOnStorage } from '../services/sessionStorage';

function Transaction(props: ITransactionprops) {
  const [transferData, setTransferdata] = useState({
    cashInUsername: '',
    value: ''
  });

  const [notification, setNotification] = useState({
    success: '',
    failure: '',
  });

  async function sendCashOut() {
    const token = getUserOnStorage();

    const transfer = await cashOut(transferData, token as string);

    if (transfer.message) {
      setNotification({
        ...notification,
        failure: transfer.message
      });
    } else {
      setNotification({ ...notification, success: 'Transferência realizada' });

      setTransferdata({ cashInUsername: '', value: '' });

      props.getBalance(token as string);
    }

    setTimeout(() => {
      setNotification({
        failure: '',
        success: ''
      });
    }, 3000);
  }

  function stopSubmit(event: React.MouseEvent) {
    event.preventDefault();

    sendCashOut();
  }

  const { cashInUsername, value } = transferData;

  return (
    <form>
      <div className='input-elem'>
        <label>Destinatário</label>
        <input
          type="text"
          placeholder="username"
          value={ cashInUsername }
          id='username'
          onChange={ ({ target }) => {
              setTransferdata({ ...transferData, cashInUsername: target.value });
            }
          }
        />
      </div>

      <div className='input-elem'>
        <label htmlFor="value">Valor</label>
        <input
          type="number"
          value={ value }
          step="0.01"
          min="0.01"
          placeholder="0.00"
          id="value"
          onChange={ ({ target }) => setTransferdata({ ...transferData, value: target.value }) }
        />
      </div>

      <div className='btn-element'>
        <button
          type="submit"
          disabled={ cashInUsername.length < 3 || Number(value) <= 0 }
          onClick={ (event) => stopSubmit(event) }
        >Enviar</button>
      </div>

      <div>
        {
          notification.failure && (
            <p className='failure'>{ notification.failure }</p>
          )
        }
        {
          notification.success && (
            <p className='success'>{ notification.success }</p>
          )
        }
      </div>
    </form>
  );
}

export default Transaction;