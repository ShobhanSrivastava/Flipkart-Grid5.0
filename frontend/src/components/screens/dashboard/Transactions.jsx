import toast from 'react-hot-toast';

const Transactions = ({ transactions, loading }) => {
    if(loading){
        return <h2>Loading...</h2>
    }

    async function handleCopy(address) {
        try {
            await navigator.clipboard.writeText(address);
            toast.success('Address copied', {
                style: {
                    background: '#333',
                    color: '#fff'
                }
            });
        } catch (err) {
            toast.error('Could not copy address');
            console.error(err);
        }
    }

  return (
    <table className='table-auto text-white border rounded text-sm w-full'>
        <thead className='border rounded'>
            <tr className='text-md'>
                <th className='border'>Transaction Id</th>
                <th className='border'>Amount</th>
                <th className='border'>Offer ID</th>
                <th className='border'>Sender/Receiver</th>
                <th className='border'>Transaction Type</th>
            </tr>
        </thead>
        <tbody >
            {transactions.map((transaction, i) => (
                <tr key={i} className={`border font-semibold ${ transaction.transactionNature === 'CREDIT' ? 'text-green-400' : 'text-red-500' }`}>
                    <td className='border text-center'>{ transaction.id }</td>
                    <td className='border text-center'>{ transaction.amount }</td>
                    <td className='border text-center'>{ (transaction.offerId != 0) ? transaction.offerId : 'None' }</td>
                    <td onClick={ () => handleCopy(transaction.otherPartyAddress) } className='border text-center'><span className='hover:cursor-pointer'>{ transaction.otherPartyName }</span></td>
                    <td className='border text-center'>{ transaction.transactionType }</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Transactions