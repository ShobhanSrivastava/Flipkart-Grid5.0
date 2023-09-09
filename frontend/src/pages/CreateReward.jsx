import { Navbar, Sidebar, Button, FormField, Loader } from '../components';
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';

function CreateReward() {
    const { address, contract, loading, setIsLoading, setIsActive } = useContext(GlobalStateContext);

    useEffect(() => {
        setIsActive('Create Reward');
    })

    const defaultForm = {
        name: '',
        value: '',
        description: '',
        startDate: '',
        endDate: '',
        quantity: '',
        image: ''
    }

    const [form, setForm] = useState(defaultForm);

    const handleFormFieldChange = (fieldName, e) => {
        setForm({
          ...form,
          [fieldName]: e.target.value
        });

        console.log(form);
    };

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const data = await contract.call('createOffer', [
            form.name, form.description, form.value, form.value, form.quantity, form.image, Math.floor(new Date(form.startDate).getTime()/1000) + 60, Math.floor(new Date(form.endDate).getTime()/1000) + 60, false
        ]);
        console.log(data);
        setForm(defaultForm);
        setIsLoading(false);
        navigate('/rewards');
    }

    return (
        address ? <> { loading && <Loader /> }
            <div className='sm:flex hidden mr-10 relative'>
            <Sidebar /> 
            </div>
            <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
                <Navbar />
                <main className='min-h-[87vh] h-max pb-[2vh] flex flex-col'>
                    <div className='bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl p-[3px]'>
                        <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-2xl sm:p-10 p-4'>
                            <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
                                <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Create a Reward</h1>
                            </div>

                            <form 
                            // onSubmit={handleSubmit}
                            className='w-full mt-[65px] flex flex-col gap-[30px]' >
                                <div className='flex flex-wrap gap-[40px]'>
                                    <FormField 
                                        labelName="Name of the reward *"
                                        placeholder="Men's Puma X-Ray Shoes"
                                        inputType="text"
                                        value={form.name}
                                        handleChange={(e) => handleFormFieldChange('name', e)}
                                    />

                                    <FormField 
                                        labelName="Value *"
                                        placeholder="Enter the actual value of the offer in ₹"
                                        inputType="text"
                                        value={form.value}
                                        handleChange={(e) => handleFormFieldChange('value', e)}
                                    />
                                </div>

                                <FormField 
                                    labelName="Description *"
                                    placeholder="Enter details of the offer"
                                    isTextArea
                                    value={form.description}
                                    handleChange={(e) => handleFormFieldChange('description', e)}
                                />

                                <div className='flex flex-wrap gap-[40px]'>
                                    <FormField 
                                        labelName="Start Date *"
                                        placeholder="Start Date"
                                        inputType="datetime-local"
                                        value={form.startDate}
                                        handleChange={(e) => handleFormFieldChange('startDate', e)}
                                    />        

                                    <FormField 
                                        labelName="End Date *"
                                        placeholder="End Date"
                                        inputType="datetime-local"
                                        value={form.endDate}
                                        handleChange={(e) => handleFormFieldChange('endDate', e)}
                                    />        

                                    <FormField 
                                        labelName="Available Quantities *"
                                        placeholder="Number of available items"
                                        inputType="Number"
                                        value={form.quantity}
                                        handleChange={(e) => handleFormFieldChange('quantity', e)}
                                    />       
                                </div>


                                <FormField 
                                    labelName="Reward Image"
                                    placeholder="Place image URL of your product"
                                    inputType="url"
                                    value={form.image}
                                    handleChange={(e) => handleFormFieldChange('image', e)}
                                    />        

                                <div className='flex justify-center items-center mt-[40px]'>
                                    <Button text='Create a Reward' onClick={(e) => handleSubmit(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </> : <ConnectWallet />
    );
}

export default CreateReward;