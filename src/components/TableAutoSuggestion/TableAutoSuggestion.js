import {Typeahead} from "react-bootstrap-typeahead";
import React, {useState} from "react";
import {useDispatch} from "react-redux";

import exact from "prop-types-exact";
import PropTypes from "prop-types";

const _ = require('lodash');

const TableAutoSuggestion = (props) => {


    const {
        id,
        rowId,
        disable,
        touched,
        errors,
        suggestionLabels,
        handleSuggestionChange,
        initialValue,
        options,
        className,
        suggestionName,
    } = props;

    //if initial value is an object wrap it in to an array
    // typeHead uses array for it's selected item
    const [selectedItem,setSelectedItem] = useState(_.isArray(initialValue) ? initialValue : [initialValue]);
    const [currentSuggestionValue,setCurrentSuggestionValue] = useState("");

    const handleOnBlur = (e)=>{


        // when suggestion is typed then check weather the typed value is an existing suggestion
        // if yes set the selectedItem, if not keep it empty
        if(_.isEmpty(selectedItem)){
            let value = (_.isUndefined(e.target) ? e : e.target.value )
            const cleanValue = _cleanValue(value);
            let isValidValue = _findAndSetSelectedOpt (cleanValue);
            if (!isValidValue){
                alert("invalid value " + value)
            }else{
                handleSuggestionChange(selectedItem,rowId,suggestionName)
            }
        }else{
            handleSuggestionChange(selectedItem,rowId,suggestionName)

        }
    }


    const handleOnChange = (selected) =>{

        if(_.isEmpty(selected)){
            setSelectedItem([])
        }else{
            setSelectedItem(selected)
            setCurrentSuggestionValue("")
        }
    }

    const handleOnInputChange = (selected) =>{
        let value = (_.isUndefined(selected.target) ? selected : selected.target.value )
        setCurrentSuggestionValue(value)
    }

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
     * @name _findAndSetSelectedOpt - stores the input value typed or selected in the suggestion field
     * @param options - available options to be selected from the suggestion
     * @param cleanValue - cleaned value which has been typed or selected
     * @returns {boolean}
     */
    const _findAndSetSelectedOpt = (cleanValue)=>{
        return options.some((option)=>{
            let storedOption = "";

            // Iterate over the provided labels
            _.forEach(suggestionLabels,(label) =>{
                // Get the appropriate properties from the current option in the collection
                storedOption = storedOption.concat(option[label])
            });

            //Clean possible whitespaces from the concatenated option
            let cleanStoredOption = _cleanValue(storedOption);

            //Store the selected if there is a match otherwise store NULL
            if (cleanValue === cleanStoredOption){


                // setSelectedItem({value:option, isValid: true})
                setSelectedItem(option)
                // handleSuggestionChange(option,rowId,suggestionName)

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
                onInputChange={handleOnInputChange}
                options={options}
                placeholder="Choose a state..."
                selected={_.isEmpty(selectedItem)?"":selectedItem}
                className={(_.isUndefined(touched) && _.isUndefined(errors)) ? className : touched[suggestionName] && errors[suggestionName] ? "error" : className}
                disabled={disable}
            />
            {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched[suggestionName] && errors[suggestionName] ? (
                <div className="error-message">{errors[suggestionName] }</div>
            ): null}
        </>
    );
};

export default TableAutoSuggestion;

TableAutoSuggestion.propTypes = exact({
    id:PropTypes.string,
    rowId:PropTypes.number,
    suggestionLabels:PropTypes.array,
    initialValue:PropTypes.array,
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