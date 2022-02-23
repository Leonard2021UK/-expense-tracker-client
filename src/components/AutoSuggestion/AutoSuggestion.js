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
        rowId,
        disable,
        touched,
        errors,
        suggestionLabels,
        updateCurrentRowItemFormState,
        handleTableChange,
        initialValue,
        options,
        className,
        reduxReducer,
        suggestionName,
        nonExistingOptionIsValid,
        setNonExistingOption,
        setFieldValue,
        setFieldTouched,
        savedNewRecord,


    } = props;

    //if initial value was provided initialise the state with that value otherwise set to empty array
    const [selectedItem,setSelectedItem] = useState(_.isUndefined(initialValue) ? _.isUndefined(savedNewRecord) ? [] : [savedNewRecord] : initialValue);

    useEffect(()=>{
        // setSelectedItem(initialValue);

        // if initial value is present and not empty, set Yup validation for initial value
        if(!_.isEmpty(initialValue) && !_.isUndefined(initialValue)){
            //TODO form appropriate value based on labels
            //this works when only one label is present
            setFieldValue(suggestionName,initialValue[0].name)

        }
        // if a newly created record was created then set Formik state accordingly
        if(!_.isEmpty(savedNewRecord)){
            setFieldValue(suggestionName,savedNewRecord.name)
        }
    },[initialValue,savedNewRecord])

    useEffect(()=>{
        // set the newly created record as selected after options in redux store were updated
        if(!_.isUndefined(savedNewRecord)){
            setSelectedItem([savedNewRecord])
        }
    },[options])

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
                id={suggestionName}
                emptyLabel="Doesn't exists! Change or create as new!"
                onBlur = {(e)=>{
                    //sets target name attribute in React synthetic event
                    e.target.name = suggestionName;

                    let value = e.target.value;
                    // when no existing option was found (user types non existing)
                    // or a user types an existing option but does not click on it in the dropdown
                    if (_.isEmpty(selectedItem) ){

                        let result = options.filter(option => option.name === value);

                        // in case when user typed an existing option
                        if(result.length > 0){
                            //sets formik state
                            setFieldValue(suggestionName,value);
                            // updates the form's react state
                            updateCurrentRowItemFormState(e,result[0])
                        }else{
                            //sets formik state
                            setFieldValue(suggestionName,'')
                            // stores the new value to be saved into DB
                            setNonExistingOption(e.target.value)
                        }


                    }else{
                        setNonExistingOption('')
                        //if reduxReducer is not present store the field's state somewhere else

                        if(_.isUndefined(reduxReducer)){
                            // updates the form's react state
                            updateCurrentRowItemFormState(e,selectedItem[0])
                        }else{
                            dispatch(reduxReducer({[suggestionName]:selectedItem[0]}))
                        }

                    }
                    //if reduxReducer is not present, store the fields state somewhere else
                    if(_.isUndefined(reduxReducer)){
                    }else{
                        dispatch(reduxReducer({[suggestionName]:selectedItem[0]}))
                    }
                    // informs formik about the field change
                    setFieldTouched(suggestionName,true)
                }}
                labelKey={getLabelKey.bind(this,suggestionLabels)}
                onInputChange={(text, event) => {
                    // in case of typing
                    setNonExistingOption(text)
                    setFieldValue(suggestionName, text);
                    setSelectedItem([])
                    //if reduxReducer is not present store the fields state somewhere else
                    if(_.isUndefined(reduxReducer)){
                        //TODO if no need negate the condition
                    }else{
                        dispatch(reduxReducer({[suggestionName]:[]}))
                    }
                }}
                onChange={(selectedItem) =>{
                    // in case of selecting from the list
                    const value = (selectedItem.length > 0) ? selectedItem[0].name:'';
                    setFieldValue(suggestionName,value)
                    setFieldTouched(true)
                    setSelectedItem(selectedItem)
                    //if reduxReducer is not present store the fields state somewhere else
                    if(_.isUndefined(reduxReducer)){
                        //TODO if no need negate the condition

                    }else{
                        dispatch(reduxReducer({[suggestionName]:selectedItem}))
                    }
                }}
                options={options}
                placeholder="Choose a state..."
                selected={selectedItem.name}
                className={(_.isUndefined(touched) && _.isUndefined(errors)) ? className : touched[suggestionName] && errors[suggestionName] ? "error" : className}
                // className={(formikValues[suggestionName] !== formikInitialValues[suggestionName]) ? className :  "error" }

            />
            {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched[suggestionName] && errors[suggestionName] ? (
                <div className="error-message">{errors[suggestionName] }</div>
            ): null}
        </>
    );
};

export default AutoSuggestion;
