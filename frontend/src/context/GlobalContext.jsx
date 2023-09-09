import { createContext, useState } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react';

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const { contract } = useContract('0xf71A218C40ad49B64De20420239eE7339aeCe705');
    const address = useAddress();

    const [loading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState('');
    const [role, setRole] = useState('');

    return (
    <GlobalStateContext.Provider
        value={{
            address,
            contract,
            loading,
            setIsLoading,
            isActive,
            setIsActive, 
            role, 
            setRole
        }}>
        { children }
    </GlobalStateContext.Provider>
)}

export default GlobalStateProvider;