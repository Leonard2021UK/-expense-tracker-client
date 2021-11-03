const inMemoryJWTManager = () => {
    let inMemoryJWT = null;

    const getToken = () => inMemoryJWT;

    const setToken = (token) => {
        inMemoryJWT = token;
        return true;
    };

    const deleteToken = () => {
        inMemoryJWT = null;
        return true;
    }

    return {
        deleteToken: deleteToken,
        getToken,
        setToken,
    }
};

export default inMemoryJWTManager();