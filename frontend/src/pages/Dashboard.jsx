import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Divider
} from '@chakra-ui/react';
import { Web3Button, Button, FormField, Navbar, Sidebar, Loader } from '../components';
import { ConnectWallet, useContractWrite } from '@thirdweb-dev/react';
import toast from 'react-hot-toast';

function Dashboard() {
    const { contract, address, setIsActive, loading, setIsLoading } = useContext(GlobalStateContext);
    
    const [userData, setUserData] = useState({
        balance: 0, totalSupply: 0
    });

    async function fetchData() {
        setIsLoading(true);
        const balance = await contract.call('balanceOf', [address]);
        const totalSupply = await contract.call('totalSupply');
        setIsLoading(false);
        setUserData({...userData, balance: parseInt(balance), totalSupply: parseInt(totalSupply) });
    }

    const [tokenForm, setTokenForm] = useState({
        tokens: ''
    });

    const [partnerForm, setPartnerForm] = useState({
        partnerAddress: ''
    });

    useEffect(() => {
        setIsActive('Admin Dashboard');
        if(contract && address) fetchData();
    }, [contract, address]);

    function handleTokenFormFieldChange(fieldName, e) {
        setTokenForm({
            ...tokenForm, [fieldName]: parseInt(e.target.value)
        })

        console.log(tokenForm.tokens);
    }

    function handlePartnerFormFieldChange(fieldName, e) {
        setPartnerForm({
            ...partnerForm, [fieldName]: e.target.value
        })
    }

    async function handleMint(e) {
        e.preventDefault();
        setIsLoading(true);
        await contract.call('_mint', [tokenForm.tokens]);
        fetchData();
        setIsLoading(false);
    }

    async function handleAddPartner(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await contract.call('updateRoleToPartner', [partnerForm.partnerAddress]);
            toast.success('Partner added!');
        } catch(err) {
            toast.error('Could not add partner');
        }
        setIsLoading(false);
    }

    return (
    address ? <>
        { loading && <Loader />}
        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar /> 
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
            <Navbar />
            <main className='h-[87vh] pb-6 flex flex-col'>
                <div className='mb-6 flex gap-3 items-center'>
                    <span className='text-3xl font-bold'>Dashboard</span>
                </div>
                <div className='bg-gradient-to-r from-rose-500 to-purple-500 h-[70vh] rounded-2xl p-[3px]'>
                    <div className='bg-[#13131A] h-full w-full rounded-2xl px-4 py-4 flex flex-col gap-4'>
                        <div className='flex gap-8 bg-[#13131A] rounded-lg py-4'>
                            <Stat className='flex justify-center'>
                                <StatLabel>Total Supply</StatLabel>
                                <StatNumber>{ userData.totalSupply }</StatNumber>
                                <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                                </StatHelpText>
                            </Stat>

                            <Divider orientation='vertical' />

                            <Stat className='flex justify-center'>
                                <StatLabel>Balance</StatLabel>
                                <StatNumber>{userData.balance}</StatNumber>
                                <StatHelpText>
                                    Club Coins
                                </StatHelpText>
                            </Stat>

                            <Divider orientation='vertical' />

                            <Stat className='flex justify-center'>
                                <StatLabel>Users</StatLabel>
                                <StatNumber>1.5Cr</StatNumber>
                                <StatHelpText>
                                <StatArrow type='increase' />
                                9.05%
                                </StatHelpText>
                            </Stat>
                        </div>
                        <div className='flex-1 w-full flex gap-4'>
                            <div className='flex-1 flex-wrap flex flex-col py-4 px-6 h-full bg-[#1C1C24] rounded-2xl gap-4'>
                                <div className='flex-1 py-[5%] px-[10%] flex flex-col justify-center items-center'>
                                    <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mb-16'>
                                        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Mint Club Coins</h1>
                                    </div>
                                    <FormField 
                                        labelName='Amount to Mint' 
                                        isTextArea={false}
                                        inputType='Number'
                                        value={tokenForm.tokens}
                                        handleChange={(e) => handleTokenFormFieldChange('tokens', e)}
                                        placeholder='Enter the amount of Club Coins to mint'
                                    />
                                    <Button text='Mint' onClick={handleMint} />
                                </div>
                            </div>
                            <div className='flex-1 flex-wrap flex flex-col py-4 px-6 h-full bg-[#1C1C24] rounded-2xl gap-4'>
                                <div className='flex-1 py-[5%] px-[10%] flex flex-col justify-center items-center'>
                                    <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mb-16'>
                                        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Add Partner</h1>
                                    </div>
                                    <FormField 
                                        labelName='Address of Partner' 
                                        isTextArea={false}
                                        placeholder='Enter the wallet address of partner'
                                        value={partnerForm.partnerAddress}
                                        handleChange={(e) => handlePartnerFormFieldChange('partnerAddress', e)}
                                    />
                                    <Button text='Add Partner' onClick={handleAddPartner} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </> : <ConnectWallet />
    );
}

export default Dashboard;