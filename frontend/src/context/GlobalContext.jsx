import { createContext, useState } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react';

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const { contract } = useContract('0xa34bDdf6156D0377B9aBb2A3275BF484780F3B62');
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