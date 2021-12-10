import {Typeahead} from "react-bootstrap-typeahead";
import {Form, Button, InputGroup, FormControl} from "react-bootstrap";
import React, {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";

const _ = require('lodash');

const AutoSuggestion = (props) => {

    const {id,suggestionLabels,initialValue,options,className,setFieldValue,setFieldTouched} = props;

    const [selectedItem,setSetSelectedItem] = useState(initialValue);
    const [nonExisting,setNonExisting] = useState();
    const [disableCreateButton,setDisableCreateButton] = useState();


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
    const getSelected = (options,cleanValue)=>{
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
                setSetSelectedItem({value:option, isValid: true})
            }else{
                setSetSelectedItem({value:"", isValid: false})
                // setSetSelectedItem(null)

            }
        });
    };

    return (
        <>

                    <Typeahead
                        id={id}
                        onBlur = {(e)=>{
                            if (!_.isUndefined(selectedItem) && selectedItem.length === 0){
                                setFieldValue('category','')
                                setNonExisting(e.target.value)

                            }
                            return setFieldTouched('category',true)
                        }}
                        labelKey={getLabelKey.bind(this,suggestionLabels)}
                        onInputChange={(text, event) => {

                        }}
                        onChange={(selectedItem) =>{
                            console.log(selectedItem)
                            const value = (selectedItem.length > 0) ? selectedItem[0].name:'';
                            setFieldValue('category',value)
                            setSetSelectedItem(selectedItem)
                        }}
                        options={options}
                        placeholder="Choose a state..."
                        selected={selectedItem}
                        className={className}
                    />


        </>
    );
};

export default AutoSuggestion;
