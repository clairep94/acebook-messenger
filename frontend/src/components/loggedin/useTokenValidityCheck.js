import { useEffect, useState } from 'react';
import isTokenValid from './LoggedInCheck';

// This hook runs every 5 seconds to check if the token is valid (not timed out.)
// REUSE ON EVERY PAGE TO TRIGGER THE NAV BAR TO CHANGE && THE LOGIN POPUP TO APPEAR.
const useTokenValidityCheck = () => {
    const [tokenValid, setTokenValid] = useState(isTokenValid());

    useEffect(() => {
        const checkTokenValidity = () => {
        const isValid = isTokenValid();
        setTokenValid(isValid);
        };

        // Initial check when the component mounts
        checkTokenValidity();

        // Check token validity every x seconds (adjust the interval as needed)
        const intervalId = setInterval(checkTokenValidity, 5000); // Check every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once on mount

    return tokenValid;
};

export default useTokenValidityCheck;
