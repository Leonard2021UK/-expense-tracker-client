import {Typeahead} from "react-bootstrap-typeahead";
import {Form, Button, InputGroup, FormControl} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";

const _ = require('lodash');

const AutoSuggestion = (props) => {

    const dispatch = useDispatch();

    const {
        id,
        suggestionLabels,
        initialValue,
        options,
        className,
        setFieldValue,
        setFieldTouched,
        reduxReducer,
        suggestionName,
        nonExistingOptionIsValid,
        setNonExistingOption
    } = props;


    //if initial value was provided initialise the state with that value otherwise set to empty array
    const [selectedItem,setSelectedItem] = useState([]);

    useEffect(()=>{

        setSelectedItem(initialValue);

        // initial value is not empty set Yup validation for initial value
        if(!_.isEmpty(initialValue)){
            //TODO form appropriate value based on labels
            console.log("initialValue ", initialValue)
            //this works when only one label is present
            setFieldValue('category',initialValue[0].name)

        }


    },[initialValue])

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

    /**
     * @name getSelected - stores the input value typed or selected in the suggestion field
     * @param options - available options to be selected from the suggestion
     * @param cleanValue - cleaned value which has been typed or selected
     * @returns {boolean}
     */
    const getSelected = (cleanValue)=>{
        return options.some((option)=>{
            let storedOption = "";

            // Iterate over the provided labels
            _.forEach(suggestionLabels,(label) =>{

                // Get the appropriate properties from the current option in the collection
                storedOption = storedOption.concat(option[label])
            });

            //Clean possible whitespaces from the concatenated option
            let cleanStoredOption = storedOption.replace(/\s+/g, '');

            //Store the selected if there is a match otherwise store NULL
            if (cleanValue === cleanStoredOption){
                // setSelectedItem({value:option, isValid: true})
                setSelectedItem(option)

            }else{
                setSelectedItem([])
                // setSelectedItem({value:"", isValid: false})
                // setSelectedItem(null)

            }
        });
    };

    return (
        <>

            <Typeahead
                id={id}
                onBlur = {(e)=>{
                    if (_.isEmpty(selectedItem) ){
                        setFieldValue('category','')
                        setNonExistingOption(e.target.value)

                    }else{
                        setNonExistingOption('')
                    }
                    dispatch(reduxReducer({[suggestionName]:selectedItem}))
                    setFieldTouched('category',true)
                }}
                labelKey={getLabelKey.bind(this,suggestionLabels)}
                onInputChange={(text, event) => {
                    setNonExistingOption(text)
                    setFieldValue('category', text);
                    setSelectedItem([])
                    dispatch(reduxReducer({[suggestionName]:[]}))


                }}
                onChange={(selectedItem) =>{
                    console.log(selectedItem)
                    const value = (selectedItem.length > 0) ? selectedItem[0].name:'';
                    setFieldValue('category',value)
                    setSelectedItem(selectedItem)
                    dispatch(reduxReducer({[suggestionName]:selectedItem}))

                }}
                options={options}
                placeholder="Choose a state..."
                selected={selectedItem.name}
                className={className}
            />


        </>
    );
};

export default AutoSuggestion;
