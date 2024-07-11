import { useContext } from 'react';
import { UserContext } from '../context/authContext';

export const useAuthContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        // throw Error('useAuthContext must be inside of an AuthContextProvider');
    }
    return context;
};
