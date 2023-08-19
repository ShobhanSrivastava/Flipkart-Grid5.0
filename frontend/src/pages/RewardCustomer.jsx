import { Button, FormField, Navbar, Sidebar, Loader } from '../components';
import { gift } from '../assets';
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context';
import { ConnectWallet } from '@thirdweb-dev/react';

function RewardCustomers() {
    const { address, contract, loading, setIsLoading, setIsActive } = useContext(GlobalStateContext);

    useEffect(() => {
        setIsLoading(true);
        setIsActive('Reward Loyal Customers');
        setIsLoading(false);
    }, []);

    const defaultForm = {
        address: '',
        tokenAmount: ''
    }

    const [form, setForm] = useState(defaultForm);

    const handleFormFieldChange = (fieldName, e) => {
        setForm({
          ...form,
          [fieldName]: e.target.value
        })

        console.log(form);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const data = await contract.call('rewardCustomer', [
            form.address, 
            parseInt(form.tokenAmount)
        ]);
        console.log(data);
        setForm(defaultForm);
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
                <main className='min-h-[87vh] h-max pb-[15vh] flex-col'>
                    <div className='bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl p-[3px]'>
                        <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-2xl sm:p-10 p-4'>
                            {/* {isLoading && <Loader /> } */}

                            <div className='w-full flex justify-start items-center p-4 bg-gradient-to-r from-rose-500 to-purple-500 h-[120px] rounded-[10px]'>
                                <img 
                                    src={gift} 
                                    alt="exclusive"
                                    className='w-[80px] h-[80px] object-contain'/>
                                <h4 className='font-bold text-white text-[25px]'>
                                    You can now reward your loyal customers with Rewards Club
                                </h4>
                            </div>

                            <form 
                            // onSubmit={handleSubmit}
                            className='w-full mt-[65px] flex flex-col gap-[30px]' >
                                <FormField 
                                    labelName="Wallet Address of the Loyal Customer"
                                    placeholder="Enter the address 0x...."
                                    inputType="text"
                                    value={form.address}
                                    handleChange={(e) => handleFormFieldChange('address', e)}
                                />

                                <FormField 
                                    labelName="Amount"
                                    placeholder="Enter the number of tokens to transfer"
                                    inputType="text"
                                    value={form.tokenAmount}
                                    handleChange={(e) => handleFormFieldChange('tokenAmount', e)}
                                />


                                <div className='flex justify-center items-center mt-[40px]'>
                                    <Button text='Pay and Reward' onClick={(e) => handleSubmit(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div> 
        </> : <ConnectWallet />
    );
}

export default RewardCustomers;