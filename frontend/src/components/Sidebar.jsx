import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { rotatingcoin } from '../assets';
import { navlinks } from '../constants';
import { Tooltip } from '@chakra-ui/react'
import { useDisconnect, useLogout } from '@thirdweb-dev/react';
import { GlobalStateContext } from '../context';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <Tooltip hasArrow placement='right' label={name} style={{ backgroundColor: '#1C1C24' }} >
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-gradient-to-r from-rose-500 to-purple-500'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
            {!isActive ? (
                <img src={imgUrl} alt="fund_logo" className='w-[30px] h-[30px]' />
                ) : (
                <img src={imgUrl} alt="fund_logo" className={`w-[30px] h-[30px] ${isActive !== name && 'grayscale'}`} />
                )}
        </div>
    </Tooltip>
)

const Sidebar = () => {
    const { isActive, setIsLoading, role, contract, address, setRole } = useContext(GlobalStateContext);

    const disconnect = useDisconnect();
    const navigate = useNavigate();

    async function fetchUserRole() {
        const user = await contract.call('getUser', [address]);
        // console.log(user);
        setRole(user[4]);
    }

    useEffect(() => {
        if(contract && address) fetchUserRole();
    }, [contract, address]);

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-max'>
        <Link to='/rewards'>
            <div className='flex-1 flex flex-col bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg p-[3px] mt-3 w-[66px]'>
                <Icon styles="w-[60px] h-[60px] bg-[#2c2f32] rounded-lg " 
                    imgUrl={rotatingcoin} 
                />
            </div>
        </Link>

        <div className='flex-1 flex flex-col bg-gradient-to-r from-rose-500 to-purple-500 rounded-[20px] p-[3px] mt-12'>
            <div className='flex flex-1 flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-6'>
                <div className='flex flex-col justify-center items-center gap-y-3.5'>
                    {
                        navlinks.filter((link) => (link.roles === role || link.roles === '*')).map((link) => (
                            <Icon 
                            key={link.name} 
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                setIsLoading(true);
                                if(link.name === 'Logout') disconnect();
                                navigate(link.link)
                                setIsLoading(false);
                            }}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar