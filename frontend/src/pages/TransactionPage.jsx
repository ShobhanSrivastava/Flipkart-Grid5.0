import { useContext, useEffect, useState } from 'react';
import { Navbar, Sidebar, Loader, Transactions, Pagination } from '../components';
import { GlobalStateContext } from '../context';
import { reload } from '../assets';
import axios from 'axios';
import { ConnectWallet } from '@thirdweb-dev/react';

function TransactionPage() {
    const { contract, address, loading, setIsLoading, setIsActive } = useContext(GlobalStateContext);

    const [transactions, setTransactions] = useState([]);
    const [reloadCount, setReloadCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage, setTransactionsPerPage] = useState(10);

    async function fetchTransactions() {
        setIsLoading(true);
        const fetchedTransactions = await contract.call('getUserTransactions', [address]);

        const parsedTransactions = [];

        for(let i=fetchedTransactions.length-1 ; i>=0 ; i--) {
            parsedTransactions.push({
                id: parseInt(fetchedTransactions[i][0]),
                transactionNature: fetchedTransactions[i][1],
                amount: parseInt(fetchedTransactions[i][2]),
                otherPartyAddress: fetchedTransactions[i][3],
                otherPartyName: fetchedTransactions[i][4], 
                offerId: parseInt(fetchedTransactions[i][5]),
                transactionType: fetchedTransactions[i][6]
            })
        }

        setTransactions(parsedTransactions);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsActive('Transactions')
        if(contract && address) fetchTransactions();
    }, [address, contract, reloadCount]);

    const indexOfLastPost = currentPage * transactionsPerPage;
    const indexOfFirstPost = indexOfLastPost - transactionsPerPage;
    const currentTransactions = transactions?.slice(indexOfFirstPost, indexOfLastPost);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        address ? <>
            { loading && <Loader />}
            <div className='sm:flex hidden mr-10 relative'>
                <Sidebar /> 
            </div>
            <div className='flex-1 max-sm:w-full mx-auto sm:pr-5 text-white'>  
                <Navbar />
                <main className='transactionBlock'>
                    <div className='mb-6 flex gap-3 items-center'>
                        <span className='text-3xl font-bold'>Club Coins History</span>
                        <img src={reload} className='w-[25px] h-[25px] hover:cursor-pointer' onClick={()=>setReloadCount(reloadCount+1)} />
                    </div>
                    <div className='bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl p-[3px] h-[70vh] transaction-table'>
                        <div className='bg-[#1c1c24] flex flex-col justify-center items-center rounded-2xl py-6 px-10 h-full'>
                            { transactions.length > 0 ? 
                            <div className='flex-1 w-full h-full justify-between flex flex-col'>
                                <Transactions transactions={currentTransactions} loading={loading} /> 
                                <Pagination transactionsPerPage={transactionsPerPage} totalTransactions={transactions.length} currentPage={currentPage} paginate={paginate}/>
                            </div> : 'No transactions available to show' }
                        </div> 
                    </div>
                </main>
            </div>
        </> : <ConnectWallet />
    );
}

export default TransactionPage;