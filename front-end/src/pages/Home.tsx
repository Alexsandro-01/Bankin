import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Transaction from "../components/Transactions";
import { getUserOnStorage } from '../services/sessionStorage';
import { getBalance } from '../services/fetch';
import { IUser } from '../interfaces/IUsers';
import Historic from '../components/Historic';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import '../styles/home.css';

function Home() {
  const [user, setUser] = useState<IUser>();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  async function getUserBalance(token: string) {
    const response = await getBalance(token);

    setUser(response);
  }

  function logout() {
    sessionStorage.removeItem('token');

    navigate('/');
  }

  useEffect(() => {
    const token = getUserOnStorage();


    if (!token) {
      navigate('/login');
    }

    getUserBalance(token as string);
  }, []);

  return (
    <main className='home'>
      <header>
        <div>
          <p>
            Olá, { user?.username }
          </p>
          <div>
            <button
              className='logout-btn'
              onClick={ () => logout() }
            >
              <TbLogout />
            </button>
          </div>
        </div>
      </header>

      <div className='home-container'>
        <section className='actual-balance'>
          <div>
            <p>Saldo disponível</p>
            <p className='balance-value'>R$ { user?.Account.balance.replace('.', ',') }</p>
          </div>
        </section>

        <section className='transactions'>
          <button
            className={ toggle ? 'toggle toggle-on' : 'toggle toggle-off' }
            onClick={() => setToggle(!toggle)}
          >
            Transferir { toggle ? <FaAngleUp /> : <FaAngleDown /> }
          </button>

          {
            toggle && (
              <Transaction getBalance={ getUserBalance } />
            )
          }
        </section>

        <section className='historic'>
          <Historic user={ user } />
        </section>
      </div>
    </main>
  )
}

export default Home;