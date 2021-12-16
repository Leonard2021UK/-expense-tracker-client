import React, {useEffect,useRef} from "react";
import {Button,Tooltip} from "react-bootstrap";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import "./TableToolBarStyle.css"
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Load LODASH, the full build.
const _ = require('lodash');

const TableToolBar = (props)=>{

    const {toggleModal} = props;
    console.log(toggleModal)
    const toolBarRef = useRef(false);

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

    const removeTableRow = ()=>{
        // props.setTableData(prevState => prevState.slice(0,-1));
        // props.setTableSuggestionRefs(prevState => prevState.slice(0,-1));
    };

    const pasteRow = () =>{
        // let selectedRows = props.tableData.filter((row,index)=> Object.keys(props.selectedRowIds).includes(index.toString()))
        // props.setTableData(prevState => (prevState.concat(selectedRows)))
    }

    return (
        <>
            <FontAwesomeIcon
                name="add"
                onClick={toggleModal}
                icon={faPlusSquare}
                className="fas fa-2x"
                color={"green"}
                style={{margin:1+"vh",cursor:"pointer"}}
            />
            {/*<Tooltip*/}
            {/*    delay={0}*/}
            {/*    target="add"*/}
            {/*    placement="top"*/}
            {/*>*/}
            {/*    Add new row*/}
            {/*</Tooltip>*/}
            {/*<Button*/}
            {/*    color="link"*/}
            {/*    className="animation-on-hover toolbar-button"*/}
            {/*    id="delete"*/}
            {/*    title=""*/}
            {/*    name="DELETE"*/}
            {/*    type="button"*/}
            {/*    disabled={false}*/}
            {/*    onClick={removeTableRow}*/}
            {/*>*/}
            {/*    <i className="tim-icons icon-simple-delete"/>*/}
            {/*</Button>*/}
            {/*<Tooltip*/}
            {/*    delay={0}*/}
            {/*    target="delete"*/}
            {/*    placement="top"*/}
            {/*>*/}
            {/*    Delete last row*/}
            {/*</Tooltip>*/}
            {/*<Button*/}
            {/*    color="link"*/}
            {/*    className="animation-on-hover toolbar-button"*/}
            {/*    id="copyRow"*/}
            {/*    title=""*/}
            {/*    name="COPY_ROW"*/}
            {/*    type="button"*/}
            {/*    disabled={false}*/}
            {/*    // onClick={copyRow}*/}
            {/*>*/}
            {/*    <i className="tim-icons icon-single-copy-04"/>*/}
            {/*</Button>*/}
            {/*<Tooltip*/}
            {/*    delay={0}*/}
            {/*    target="copyRow"*/}
            {/*    placement="top"*/}
            {/*>*/}
            {/*    Copy selected*/}
            {/*</Tooltip>*/}
            {/*<Button*/}
            {/*    color="link"*/}
            {/*    className="animation-on-hover toolbar-button"*/}
            {/*    id="paste"*/}
            {/*    title=""*/}
            {/*    name="PASTE_SELECTED"*/}
            {/*    type="button"*/}
            {/*    disabled={false}*/}
            {/*    onClick={pasteRow}*/}
            {/*>*/}
            {/*    <i className="tim-icons icon-paper"/>*/}
            {/*</Button>*/}
            {/*<Tooltip*/}
            {/*    delay={0}*/}
            {/*    target="paste"*/}
            {/*    placement="top"*/}
            {/*>*/}
            {/*    Paste selected*/}
            {/*</Tooltip>*/}
            {/*<Button*/}
            {/*    color="link"*/}
            {/*    className="animation-on-hover toolbar-button"*/}
            {/*    id="clearList"*/}
            {/*    title=""*/}
            {/*    name="CLEAR_LIST"*/}
            {/*    type="button"*/}
            {/*    onClick={clearTable}*/}
            {/*>*/}
            {/*    <i className="tim-icons icon-refresh-01"/>*/}
            {/*</Button>*/}
            {/*<Tooltip*/}
            {/*    delay={0}*/}
            {/*    target="clearList"*/}
            {/*    placement="top"*/}
            {/*>*/}
            {/*    Clear table entries*/}
            {/*</Tooltip>*/}
            </>
    )
};

export default TableToolBar;