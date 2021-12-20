import {Typeahead} from "react-bootstrap-typeahead";
import {Form, Button, InputGroup, FormControl} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import {logDOM} from "@testing-library/react";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import ExpenseForm from "../Forms/ExpenseForm/ExpenseForm";

const _ = require('lodash');

const TableAutoSuggestion = (props) => {

    const dispatch = useDispatch();

    const {
        id,
        rowId,
        suggestionLabels,
        handleTableChange,
        initialValue,
        options,
        className,
        reduxReducer,
        suggestionName,
        nonExistingOptionIsValid,
        setNonExistingOption
    } = props;



    //if initial value was provided initialise the state with that value otherwise set to empty object
    const [selectedItem,setSelectedItem] = useState(initialValue);
    const [currentSuggestionValue,setCurrentSuggestionValue] = useState("");

    const handleOnBlur = (e)=>{

        console.log(_.isEmpty(selectedItem))

        if(_.isEmpty(selectedItem)){
            let value = (_.isUndefined(e.target) ? e : e.target.value )
            const cleanValue = _cleanValue(value);
            _setSelectedOpt (cleanValue);

        }

        // // if(_.isArray(value)){
        // //     value = value[0].name;
        // // }
        console.log("HANDLE BLUR")
        // //
        console.log(currentSuggestionValue)
        handleTableChange(selectedItem,rowId,suggestionName)

        // setSelectedItem(value[0])
        //
        // // //Clean the string value received from the suggestion (remove white spaces)
        // const cleanValue = _cleanValue(currentSuggestionValue);
        // console.log(cleanValue)
        // // // //Check if input is valid in the suggestion field
        // _setSelectedOpt (cleanValue);

        // setTimeout(()=>{
        //     console.log(selectedItem)
        //
        // },2000)
    }
    useEffect(()=>{
        console.log(selectedItem)

    },[selectedItem])

    const handleOnChange = (selected) =>{
        console.log("HANDLE CHANGE")
        console.log(selected)

        if(_.isEmpty(selected)){
            setSelectedItem([])
        }else{
            setSelectedItem(selected)
        }
        // setSelectedItem(value[0])
        // console.log(value)

    }

    // const handleOnInputChange = (selected) =>{
    //     console.log("HANDLE INPUT CHANGE")
    //     console.log(selected)
    //     // // let value = (_.isUndefined(selected.target) ? selected : selected.target.value )
    //     // //
    //     // setCurrentSuggestionValue(selected)
    //     // console.log(currentSuggestionValue)
    // }

    /**
     *  @function getLabelKey - returns data to be shown in the suggestion for each record
     *  @param {array} suggestionLabels - select which columns should be shown in the suggestion
     *  @param {object} option - default parameter, contains all data requested from the DB
     *  @returns {string} a string which represents a line data in the suggestion
     */
    const getLabelKey = (suggestionLabels, option) => {
        if (option) {
            let extendedLabels = suggestionLabels.map((label) => {
                return `${option[label]}`;
            });
            return extendedLabels.toString().replace(/,/g, " ");
        }
    };

    const _cleanValue = (value)=>{
        return value.replace(/\s+/g, '');
    }

    /**
     * @name _setSelectedOpt - stores the input value typed or selected in the suggestion field
     * @param options - available options to be selected from the suggestion
     * @param cleanValue - cleaned value which has been typed or selected
     * @returns {boolean}
     */
    const _setSelectedOpt = (cleanValue)=>{
        return options.some((option)=>{
            let storedOption = "";

            // Iterate over the provided labels
            _.forEach(suggestionLabels,(label) =>{
                // Get the appropriate properties from the current option in the collection
                storedOption = storedOption.concat(option[label])
            });

            //Clean possible whitespaces from the concatenated option
            let cleanStoredOption = _cleanValue(storedOption);
            console.log(cleanValue)
            console.log(cleanStoredOption)
            //Store the selected if there is a match otherwise store NULL
            if (cleanValue === cleanStoredOption){
                console.log("SAME")

                console.log(cleanValue)
                console.log(cleanStoredOption)

                // setSelectedItem({value:option, isValid: true})
                console.log(option)
                setSelectedItem(option)

                return true;
                // console.log(option)
            }

        });

    };

    return (
        <>
            <Typeahead
                id={id}
                labelKey={getLabelKey.bind(this,suggestionLabels)}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                // onInputChange={handleOnInputChange}
                options={options}
                placeholder="Choose a state..."
                selected={_.isEmpty(selectedItem)?"":selectedItem}
                className={className}
            />
        </>
    );
};

export default TableAutoSuggestion;

TableAutoSuggestion.propTypes = exact({
    id:PropTypes.string,
    rowId:PropTypes.number,
    suggestionLabels:PropTypes.array,
    initialValue:PropTypes.object,
    options:PropTypes.arrayOf(Object),
    className:PropTypes.string,
    reduxReducer:PropTypes.func,
    suggestionName:PropTypes.string,
    nonExistingOptionIsValid:PropTypes.bool,
    setNonExistingOption:PropTypes.func,
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
    handleTableChange:PropTypes.func
});