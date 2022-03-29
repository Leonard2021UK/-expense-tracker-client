import React from "react";
import "./pageLoadingSpinner.css";

const PageLoadingSpinner = (props) =>{
    const {hidden} = props;

    if(!hidden){
        return null;
    }else{
        return (
            <div className="loading">
                <div className="spinner">
                    <div className="word1">Loading</div>
                </div>
            </div>
        )
    }
}

export default PageLoadingSpinner;
