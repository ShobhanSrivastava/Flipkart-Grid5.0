import { Avatar } from '@chakra-ui/react'
import { coin, avatar, flipkart } from '../assets';
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context';
import { ConnectWallet } from '@thirdweb-dev/react';

function Navbar() {
    const { address, contract, loading, isActive } = useContext(GlobalStateContext);

    const [balance, setBalance] = useState(0);
    const [profile, setProfile] = useState('');

    async function fetchBalance() {
        const userBalance = await contract.call('balanceOf', [address]);
        setBalance(parseInt(userBalance));
    }

    useEffect(() => {
        if(contract && address) fetchBalance();
    }, [contract, address, loading]);

    return (
        <nav style={{zIndex: 10001}} className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 h-[8vh] items-center">
            <p className="text-2xl font-bold flex items-end gap-1 text-white">Rewards Club <span className='text-xs py-1'>by</span> <img src={flipkart} className='h-[15px] my-[5px]' /> </p>
            <div className='flex items-center gap-4'>
                {address && <div className='bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg p-[3px] flex gap-2 items-center font-bold'>
                    <div className='py-2 px-4 bg-[#1C1C24] rounded-lg flex gap-2 items-center font-bold'>
                        <img src={coin} className='w-[30px] h-[30px]' />{balance}
                    </div>
                </div>}
                <div className='bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg p-[3px] flex gap-2 items-center font-bold'>
                    <ConnectWallet theme='dark' />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;