const parseJwt = (token) => {
    try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    



const getSessionUserID = (token) => {
    console.log(`Decoding Token: ${token}`)
    const decodedToken = parseJwt(token);
    console.log(`Decoded Token: ${decodedToken}`);
    
    const userID = decodedToken ? decodedToken.user_id : null;

    console.log(`UserID: ${userID}`);
    return userID;

}


export default getSessionUserID;