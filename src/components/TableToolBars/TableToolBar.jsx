import React, {useEffect,useRef} from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {faPlusSquare,faMinusSquare,faSolarPanel} from "@fortawesome/free-solid-svg-icons";
import "./TableToolBarStyle.css"
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Load LODASH, the full build.
const _ = require('lodash');

const TableToolBar = (props)=>{

    const {add,remove,clear,disable} = props;

    //Redux dispatch hook
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(toolBarRef.current) {
    //         if (!_.isUndefined(props.tableSuggestionRefs[0])) {
    //             // clears the suggestion field in the table by its reference
    //             props.tableSuggestionRefs[0].clear();
    //         }
    //         resetTable();
    //         // this variable is set to true in Receipt component when the form successfully submitted
    //         props.setReceiptReset(false)
    //     }
    //     toolBarRef.current = true;
    // },[props.receiptReset]);

    //only clears entries in the table
    const clearTable = (ref)=> {

        // // clears all suggestions in the table by their reference
        // props.tableSuggestionRefs.forEach((ref) => ref.clear());
        //
        // // maps all rows in the table and initializes
        // const clearedTable = _.map(props.tableData, (row) => {
        //     return {
        //         "NEW_RECEIPT__RECEIPT_ROW_PRODUCT":{value:"",isValid:false},
        //         "NEW_RECEIPT__RECEIPT_ROW_PRICE": {value:"",isValid:false},
        //         "NEW_RECEIPT__RECEIPT_ROW_PCS": {value:"",isValid:false},
        //         "NEW_RECEIPT__RECEIPT_ROW_IS_IN_OFFER":{value:0,isValid:true}
        //     }
        // })
        //
        // //initializes redux store
        // // dispatch(initTable({tableValues:clearedTable}));
        //
        // //initialize react-table
        // props.setTableData(clearedTable)

    };

    // initializes the table
    const resetTable = ()=>{
        // props.setTableData(() =>
        //     [
        //         {
        //             "NEW_RECEIPT__RECEIPT_ROW_PRODUCT":{value:"",isValid:false},
        //             "NEW_RECEIPT__RECEIPT_ROW_PRICE":{value:"",isValid:false},
        //             "NEW_RECEIPT__RECEIPT_ROW_PCS":{value:"",isValid:false},
        //             "NEW_RECEIPT__RECEIPT_ROW_IS_IN_OFFER":{value:0,isValid:true},
        //         }
        //     ]
        // );
    }

    const handleCreateNewExpenseTracker = ()=>{
        // toggleModal()
        // props.setTableData(prevState =>
        //     [...prevState,{
        //         "NEW_RECEIPT__RECEIPT_ROW_PRODUCT":null,
        //         "NEW_RECEIPT__RECEIPT_ROW_PRICE":null,
        //         "NEW_RECEIPT__RECEIPT_ROW_PCS":null,
        //         "NEW_RECEIPT__RECEIPT_ROW_IS_IN_OFFER":{value:0,isValid:true},
        //     }]
        // )
    };

    // const removeTableRow = ()=>{
    //     // props.setTableData(prevState => prevState.slice(0,-1));
    //     // props.setTableSuggestionRefs(prevState => prevState.slice(0,-1));
    // };

    // const addTableRow = ()=>{
        // props.setTableData(prevState => prevState.slice(0,-1));
        // props.setTableSuggestionRefs(prevState => prevState.slice(0,-1));
    // };

    // const pasteRow = () =>{
    //     // let selectedRows = props.tableData.filter((row,index)=> Object.keys(props.selectedRowIds).includes(index.toString()))
    //     // props.setTableData(prevState => (prevState.concat(selectedRows)))
    // }

        return (
            <>
                {
                    _.isUndefined(add) ? null :
                        <FontAwesomeIcon
                            name="add"
                            onClick={add}
                            icon={faPlusSquare}
                            className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                            color={"green"}
                            style={{margin: 1 + "vh", cursor: "pointer"}}
                        />
                }
                {
                    _.isUndefined(remove) ? null:
                        <FontAwesomeIcon
                        name="add"
                        onClick={remove}
                        icon={faMinusSquare}
                        className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                        color={"red"}
                        style={{margin:1+"vh",cursor:"pointer"}}
                        />
                }
                {
                    _.isUndefined(clear) ? null:
                        <FontAwesomeIcon
                            name="add"
                            onClick={clear}
                            icon={faSolarPanel}
                            className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                            color={"red"}
                            style={{margin:1+"vh",cursor:"pointer"}}
                        />
                }
            </>
        )
    }






export default TableToolBar;