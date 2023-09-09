import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Sidebar, Navbar, Loader } from '../components';
import { daysLeft } from '../utils';
import { CountBox } from '../components';
import { GlobalStateContext } from '../context';
import { ConnectWallet } from '@thirdweb-dev/react';
import { toast } from 'react-hot-toast';

function OfferDetails() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { contract, address, loading, setIsLoading } = useContext(GlobalStateContext);

  const [balance, setBalance] = useState(0);

  const remainingDays = daysLeft(state.endTime);

  async function fetchBalance() {
    setIsLoading(true);
    const balance = await contract.call('balanceOf', [address]);
    setBalance(balance);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract && address) fetchBalance();
  }, [address, contract]);

  async function handleBuy() {
    setIsLoading(true);
    await contract.call('buyOffer', [ state.id ]);
    setIsLoading(false);
    toast.success('Offer claimed');
  }

  return (
    address ? <>
        { loading && <Loader />}
        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar /> 
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
          <Navbar />
          <main>
            <div className='w-full flex md:flex-row flex-col mt-[10px] gap-[30px]'>
              <div className='flex-1 flex-col'>
                <img src={state.productURL} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
                {/* <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-full'>
                </div> */}
              </div>

              <div className='flex md:w-[250px] w-full flex-wrap justify-between gap-[30px]'>
                <CountBox title="Days Left" value={remainingDays} />
                <CountBox title="Quantity Left" value={state.quantity} />
                <CountBox title="Club Coins" value={state.price} />
              </div>
            </div>

            <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
                <div className='flex-[2] flex flex-col gap-[40px]'>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Seller</h4>
                    <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
                      <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                        {/* <img 
                          // src={thirdweb} 
                          alt="user" className="w-[60%] h-[60%] object-contain"/> */}
                      </div>
                      <div>
                        <h4 className='font-epilogue font-semibold text-2xl text-white break-all'>{state.businessName}</h4>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-epilogue font-bold text-[18px] text-white uppercase">Actual Value: ₹{state.value}</h4>
                  </div>

                  <div>
                    <h4 className="font-epilogue font-bold text-[18px] text-white uppercase">Product Description</h4>
                    <div className='mt-[20px]'>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
                    </div>
                  </div>
                </div>

                <div className='flex-1'>
                <h4 className="font-epilogue font-bold text-[18px] text-white uppercase">Claim this Offer</h4>

                  <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
                    <div className='mt-[30px]'>
                      <div className='flex justify-center'>
                          {
                            (balance < state.price) ? 
                            "You don't have enough coins" : 
                            <Button onClick={handleBuy} text='Claim Now' />
                          }
                      </div>

                      <div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
                        <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>Claim this offer before it gets sold out!</h4>
                        <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>Club Coins equal to the price of the product will be deducted from your account</p>
                      </div>
                    </div>
                  </div>
                </div>

            </div>

          </main>
        </div>
    </> : <ConnectWallet />
  )
}

export default OfferDetails;