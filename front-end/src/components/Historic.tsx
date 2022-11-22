import { useEffect, useState } from 'react';
import { IPropHistoric, ITransactionModel } from '../interfaces/ITransactions';
import { getHistoric } from '../services/fetch';
import { getUserOnStorage } from '../services/sessionStorage';
import RenderTransaction from './RenderTransaction';

function Historic({ user }: IPropHistoric) {
  const [userHistoric, setUserHistoric] = useState<ITransactionModel[]>([]);
  const [params, setParams] = useState({
    date: '',
    cashIn: false,
    cashOut: false
  });

  const [toggle, setToggle] = useState(false);

  async function findHistoric() {
    const { date, cashIn, cashOut } = params;
    const token = getUserOnStorage();

    let query  = 'all';

    if (cashIn) {
      query = 'cash-in';
    }

    if (cashOut) {
      query = 'cash-out';
    } 

    if (date) {
      query += `&date=${date}`;
    }

    const response = await getHistoric(query, token as string);

    orderHistoric(response);
  }

  function orderHistoric(historic: ITransactionModel[]) {
    const sorted = historic.sort(
      (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setUserHistoric(sorted);
  }

  useEffect(() => {
    findHistoric();
  }, [user, toggle]);

  return (
    <>
      <h3>Histórico</h3>
      <div className='input-container'>
        <div className='date'>
          <label htmlFor="date">Filtrar po data</label>
          <input
            type="date"
            value={ params.date }
            id="date"
            onChange={ ({ target }) => setParams({ ...params, date: target.value }) }
          />
        </div>
        <div className='radio'>
          <div>
            <input
              type="radio"
              name="type"
              id="cash-in"
              checked={ params.cashIn }
              onChange={ () => {
                setParams({ ...params, cashIn: !params.cashIn, cashOut: false });
              }}
            />
            <label htmlFor="cash-in">cash-in</label>
          </div>
          <div>
            <input
              type="radio"
              name="type"
              id="cash-out"
              checked={ params.cashOut }
              onChange={ () => {
                setParams({ ...params, cashOut: !params.cashOut, cashIn: false })
              }}
            />
            <label htmlFor="cash-out">cash-out</label>
          </div>
        </div>
        <div className='filter-container-btn'>
          {
            toggle && (
              <button
                type='button'
                onClick={ () => {
                  setToggle(!toggle);
                  setParams({ date: '', cashIn: false, cashOut: false });
                } }
              >clear</button>
            )
          }

          {
            !toggle && (
              <button
                type='button'
                disabled={ !params.date && !params.cashOut && !params.cashIn }
                onClick={ () => {
                    setToggle(!toggle);
                  } 
                }
              >buscar</button>
            )
          }
        </div>
      </div>

      <section>
          {
            userHistoric.length !== 0 ? (
              userHistoric.map((transaction: ITransactionModel) => (
                <RenderTransaction key={ transaction.id } transaction={ transaction } userAccount={ user?.accountId } />                
              ))
            ) : (
              <div className='empity'>
                <p>Nenhuma transferência encontrada</p>
              </div>
            )
          }
        </section>
    </>
  )
}

export default Historic;