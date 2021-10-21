// Icon
import React from "react";
import PropTypes from 'prop-types'; // ES6

const CompanyLogo = (props)=>{
    const {width,height} = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor"
             className="bi bi-ui-radios-grid" viewBox="0 0 16 16">
            <path
                d="M3.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm9-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM16 3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-9 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm5.5 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm-9-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
        </svg>
    )
};

export default CompanyLogo;

CompanyLogo.protoTypes = {
    width:PropTypes.number,
    height:PropTypes.number
}