import { useContext, useEffect } from "react";
import { Sidebar, Navbar } from "../components";
import { GlobalStateContext } from "../context";
import { ConnectWallet } from "@thirdweb-dev/react";

function Tokenomics() {

    const { address, setIsActive } = useContext(GlobalStateContext);

    useEffect(() => {
        setIsActive('Learn to Earn');
    }, []);

    return (
        address ? <>
        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar /> 
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
            <Navbar />
            <main className='h-[87vh] pb-6 flex flex-col'>
                <div className='mb-6 flex gap-3 items-center'>
                    <span className='text-3xl font-bold'>Tokenomics</span>
                </div>
                <div className='bg-gradient-to-r from-rose-500 to-purple-500 h-[70vh] rounded-2xl p-[3px]'>
                    <div className='bg-[#13131A] h-full w-full rounded-2xl px-12 py-8 flex flex-col gap-4'>
                        <span className="text-2xl font-bold">Customers</span>
                        <ul className="list-disc px-6">
                            <li>You can earn 2 Club Coins(for non-plus customers) and 4 Club Coins(for plus customers) for every hundred rupees spent on Flipkart Ecommerce Platform. Only a maximum of 50 Club Coins(for non-plus customers) and 100 Club Coins(for plus customers) can be availed per transaction.  </li>
                            <li>On each successful referral on Rewards Club Platform you will be credited with 25 Club Coins.</li>
                            <li>Earn 10 Club Coins on each reward/exclusive deal share on your social media handles. Only 1 post per reward/deal is eligible for reward. </li>
                            <li>[Coming Soon!] You can also earn Club Coins by playing games on the Rewards Club Platform. </li>
                        </ul>
                        <span className="text-2xl font-bold">Partners</span>
                        <ul className="list-disc px-6">
                            <li>Partners can earn Club Coins by providing exclusive deals on the platform. The Club Coins will be transferred to the seller's account on each sale.</li>
                            <li>Partners can provide discount coupons and vouchers in the form of rewards. These rewards must be claimable and redeemable rewards and must provide some value to the customer.</li>
                            <li>Club Coins accumulated by the partners during the day will be settled at 11:59PM every day. The respective INR amount will be transferred to your bank accounts. </li>
                            <li>You can also reward your loyal customers by rewarding them with tokens. You will need to pay for the tokens in respective INR amount.</li>
                        </ul>

                        Note: Each Club Coin is pegged at INR 1 value. It means that 1 Club Coin = 1 INR. 
                    </div>
                </div>
            </main>
        </div>
        </>
        : <ConnectWallet />
    );
}

export default Tokenomics;