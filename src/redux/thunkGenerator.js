import inMemoryJWT from "../utils/inMemoryJWT";

const thunkGenerator = async (sliceName,actions,dispatch,prevState,reduxRootDirName,fetchUrl)=>{
    //TODO implement caching e.g. redux-persist, reselect



    //Check the store tree hierarchy
    // Check if the data stored is upto date, only if not make a request
    //validates one level deep in the redux store
    const requestedReduxFieldIsValid = ((prevState || {})[`${reduxRootDirName}`] || {}).didInvalidate;
    //validates two level deep in the redux store
    const requestedReduxSliceIsValid = (((prevState || {})[`${reduxRootDirName}`] || {})[`${sliceName}`] || {}).didInvalidate;

    // if (prevState && ((prevState[`${reduxRootDirName}`] && prevState[`${reduxRootDirName}`].didInvalidate) || (prevState[`${reduxRootDirName}`] && prevState[`${reduxRootDirName}`][`${sliceName}`] && prevState[`${reduxRootDirName}`][`${sliceName}`].didInvalidate)))
        if (requestedReduxFieldIsValid || requestedReduxSliceIsValid)
        {

        //Get access token from redux store
        // const accessToken = prevState.authUserInfo.user0AuthToken;
        const accessToken = inMemoryJWT.getToken();
        //Set fetch option
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + accessToken
            }
        };

        //Start fetch
        dispatch(actions[`${sliceName}RequestFetching`]({data: true}));
        dispatch(actions[`${sliceName}InValidate`]({data: false}));
        try {
            // dispatch(actions[`${sliceName}RequestFetching`]({data: true}));
            const response = await fetch(fetchUrl, fetchOption);

            // Suggestion fetching is successful
            if (response.status === 200) {
                const data = await response.json();
                if(data !== null){
                    dispatch(actions[`${sliceName}RequestSuccess`]({data: data}));
                }
            } else {
                const data = await response.json();
                dispatch(actions[`${sliceName}RequestFail`]({data: data}));
                // dispatch(actions[`${sliceName}InValidate`]({data: true}));
            }
            //End fetch
            dispatch(actions[`${sliceName}RequestFetching`]({data: false}));
        } catch (e){

            dispatch(actions[`${sliceName}RequestException`]({data: []}));
            //End fetch
            dispatch(dispatch(actions[`${sliceName}RequestFetching`]({data: false})));
            //Invalidate data
            dispatch(actions[`${sliceName}InValidate`]({data: true}));
        }
    }

};

export default thunkGenerator;