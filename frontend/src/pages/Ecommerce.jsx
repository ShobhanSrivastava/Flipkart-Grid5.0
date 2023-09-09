import toast from 'react-hot-toast';
import { Button, FormField, Loader } from '../components';
import { useContext, useState } from 'react';
import { GlobalStateContext } from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ecommerce() {
    const navigate = useNavigate();

    const { loading, setIsLoading } = useContext(GlobalStateContext);
    const [address, setAddress] = useState('');

    async function handleBuyNow(e) {
        e.preventDefault();
        if(!address) {
            alert('Enter the user wallet address');
            return;
        }

        setIsLoading(true);
        
        try {
            await axios.post('/api/reward-for-purchase', {
                address, purchaseAmount: 75000
            })
            toast.success('Purchase successful! Club Coins rewarded!');
        } catch(err) {
            console.log(err.message);
        }

        setIsLoading(false);
    }

    return (
        <>
            { loading && <Loader /> }
            <main>
                <div className='flex-1 flex flex-col items-center'>
                    <div className='flex items-center justify-center'>
                        <img src="https://stockarea.io/blogs/wp-content/uploads/2021/11/flipkart-logo-39906.png" className="w-[200px]"/>
                        <FormField 
                            placeholder='User Wallet Address' 
                            handleChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            value={address}
                            inputType="text"
                            labelName='Address *'
                        />
                    </div>
                    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-purple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027205808"
                    alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
                    <p className="text-white p-4 text-2xl">IPhone 14 Pro - ₹75000</p>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <Button onClick={(e) => handleBuyNow(e)} text='Buy Now' />
                        <Button text='Check Transactions' onClick={() => navigate('/transactions')} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Ecommerce;