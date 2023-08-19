import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Navbar, Button, Loader } from "../components";
import { GlobalStateContext } from "../context";
import { Avatar } from "@chakra-ui/react";
import { checkIfImage } from "../utils";
import { toast } from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const { loading, contract, setIsLoading, setRole, isActive, setIsActive, address } = useContext(GlobalStateContext);

    const [form, setForm] = useState({
        name: '',
        image: ''
    });

    useEffect(() => {
        setIsActive('Register');
    }, []);

    function handleFormFieldChange(fieldName, e) {
        setForm({ ...form, [fieldName]: e.target.value });

        if(fieldName === 'image') {
            setIsLoading(true);
            checkIfImage(e.target.value, async (exists) => {
                if(!exists) {
                    alert('Please paste a valid image URL');
                }
            })
            setIsLoading(false);
        }

        console.log(form);
    }

    async function handleSubmit(e) {
        if(!form.name) {
            toast.error('Name and Email are required fields');
            return;
        }

        e.preventDefault();
        setIsLoading(true);
        await contract.call('createUser', [form.name, form.image || '']);
        const user = await contract.call('getUser', [address]);
        setRole(user[4]);
        console.log('user', user);
        setIsLoading(false);
        navigate('/rewards');
    }

    return (
        <>
            {loading && <Loader /> }
            <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
                <Navbar />
                <main className="flex w-full items-center justify-center">
                    <div className='w-[50vw] bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl p-[3px]'>
                        <div className='w-full bg-[#1c1c24] flex justify-center items-center flex-col rounded-2xl sm:p-10 p-4'>

                            <Avatar className="border-4" size="2xl" src={form.image} />

                            <form 
                            // onSubmit={handleSubmit}
                            className='w-full mt-[65px] flex flex-col gap-[15px]' >
                                <FormField 
                                    labelName="Name *"
                                    placeholder="John Doe"
                                    inputType="text"
                                    value={form.name}
                                    handleChange={(e) => handleFormFieldChange('name', e)}
                                />

                                <FormField 
                                    labelName="Profile Picture"
                                    placeholder="Paste your profile picture URL here"
                                    inputType="text"
                                    value={form.image}
                                    handleChange={(e) => handleFormFieldChange('image', e)}
                                />

                                <div className='flex justify-center items-center mt-[40px]'>
                                    <Button text='Register' onClick={(e) => handleSubmit(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Register;