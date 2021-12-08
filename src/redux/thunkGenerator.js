import inMemoryJWT from "../utils/inMemoryJWT";
import fetchOptions from "../../fetchOptions";

const thunkGenerator = async (sliceName,actions,dispatch,prevState,reduxRootDirName,fetchUrl)=>{
    //TODO implement caching e.g. redux-persist, reselect
    //Check the store tree hierarchy

    const requestedReduxFieldIsValid = ((prevState || {})[`${reduxRootDirName}`] || {}).didInvalidate;
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

            const response = await fetch(fetchUrl, fetchOption);
            const data = await response.json();
            console.log(sliceName)
            console.log(data)
            // Suggestion fetching is successful
            if (data.data !== null && data.status === "success") {
                dispatch(actions[`${sliceName}RequestSuccess`]({data: data}));
            } else {
                dispatch(actions[`${sliceName}RequestFail`]({data: data}));
                dispatch(actions[`${sliceName}InValidate`]({data: true}));
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