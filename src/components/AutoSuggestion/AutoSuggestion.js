import {Typeahead} from "react-bootstrap-typeahead";
import {Form} from "react-bootstrap";
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
const _ = require('lodash');

const AutoSuggestion = (props) => {
    const {id,labelKey,suggestionLabels,initialValue} = props;

    const [selection, setSelection] = useState([]);
    const reduxSuggestions = useSelector(state => state.suggestions);
    const [selectedItem,setSetSelectedItem] = useState(initialValue);


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

                // Get the appropriate values from the stored option
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
            <Form.Group>
                <Typeahead
                    id={id}
                    labelKey={getLabelKey.bind(this,suggestionLabels)}
                    onChange={setSelection}
                    options={["ff","fff"]}
                    placeholder="Choose a state..."
                    selected={selection}
                />
            </Form.Group>
        </>
    );
};

export default AutoSuggestion;
