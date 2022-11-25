import { IPropRenderTransacrtion } from "../interfaces/ITransactions";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

function RenderTransaction({ transaction, userAccount }: IPropRenderTransacrtion) {

  const date = new Date(transaction.createdAt).toLocaleDateString()
  
  return (
    <div key={ transaction.id } className='render-transaction-container'>
      <div>
          <p>
            <strong>
              Tranferência 
              {
                userAccount === transaction.debitedAccountId ?
                (<span> enviada <FaArrowUp className="transfer-down" /></span>) :
                (<span> recebida <FaArrowDown className="transfer-up" /></span>)
              }
            </strong>
          </p>
          <p><small>{ date }</small></p>
      </div>
      <p className="balance-value" >R$ { transaction.value.replace('.', ',') }</p>
    </div>
  )
}

export default RenderTransaction;