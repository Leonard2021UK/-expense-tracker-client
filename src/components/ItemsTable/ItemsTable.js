import "./ItemsTableStyle.css";
import React, {useEffect, useState} from "react";
import ItemsTableHeader from "./ItemsTableHeader/ItemsTableHeader";
import AutoSuggestion from "../AutoSuggestion/AutoSuggestion";
import {Col, Form, FormControl, InputGroup} from "react-bootstrap";
import {setItemCategory, setItemFormState, setUnit} from "../../redux/features/domain/forms/itemFormSlice";
import RowAction from "../RowAction/RowAction";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import TableAutoSuggestion from "../TableAutoSuggestion/TableAutoSuggestion";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {setItemTableState,updateSelectedRow,addRow,removeRow,removeSelectedRow,clearTableState} from "../../redux/features/domain/tables/itemsTableSlice"

const {useTable} = require("react-table");

function ItemsTable(props) {

    console.log(props)
    const rItemCategories = useSelector((state) => state.suggestions.itemCategory.response);
    const rUnitTypes = useSelector((state) => state.suggestions.unitType.response);
    const rItem = useSelector((state) => state.suggestions.item.response);

    const [inputField,setInputField] = useState({});

    const {
        data,
        disable,
        removeSelectedRow,
        handleSuggestionChange,
        handleTableInputChange,
        setNonExistingItemOption,
        setNonExistingUnitOption,
        setNonExistingCategoryOption,
        nonExistingUnitOptionIsValid,
        nonExistingItemOptionIsValid,
        nonExistingItemCategoryOptionIsValid
    } = props;

    const dispatch = useDispatch();

    const handleInputFiledOnBlur = (e,rowId) => {
        // let name = e.target.name;
        console.log(inputField)
        // dispatch(updateSelectedRow({
        //     rowId:rowId,
        //     fieldName:name,
        //     value:[inputField[name]]
        // }))
        // setInputField({})
    }

    // useEffect(()=>{
    //
    //     // if (!_.isEmpty(inputField)){
    //         const keys = Object.keys(inputField);
    //         const name = keys[0];
    //         const rowId = inputField.rowId
    //         const value = inputField[name];
    //         console.log(name)
    //         console.log(rowId)
    //
    //         console.log(value)
    //         dispatch(updateSelectedRow({
    //             rowId:rowId,
    //             fieldName:name,
    //             value:value
    //         }))
    //
    //     // }
    //
    // },[inputField])


    const handleInputFiledChange = (e,rowId) =>{
        console.log("INPUTFIELD")
        const inputType = e.target.type;
        let name = e.target.name;
        let value = e.target.value;
        console.log("VALUE ", value)

        switch (true){
            case (inputType === "text" ):
                setInputField(prevState => ({...prevState,[name]:value,rowId:rowId}));

        }
    }

    const updateTableRow = (selectedItem,rowId,suggestionName)=>{

        dispatch(updateSelectedRow({
            rowId:rowId,
            fieldName:suggestionName,
            value:selectedItem
        }))
        // let prevState = [...itemTableData];
        // prevState[rowId] = selectedItem[0];
        //
        // setItemTableData(prevState)
    }





    console.log(data)

    const columns = React.useMemo(
        () => [
            {
                id:"id1",
                Header: <ItemsTableHeader id="itemInfo" name="itemInfo" title = "Item information"/>,
                columns:

                    [
                    {
                        Header: <ItemsTableHeader id="itemNr" name="itemNr" title = "Item Nr."/>,
                        id:"id11",
                        accessor: 'itemNr',
                        Cell:({row: {index}})=>{
                            return(
                                <div className="item_number" id={"row_" + index}>
                                    {index}
                                </div>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemName" name="itemName" title = "Item name"/>,
                        id:"id12",
                        accessor: 'itemName',
                        Cell:({row: {index}})=>{

                            return(
                                <Col lg={12}>
                                    <TableAutoSuggestion
                                        id={"item_" + index}
                                        rowId={index}
                                        suggestionName="item"
                                        handleSuggestionChange={updateTableRow}
                                        reduxReducer={setItemFormState}
                                        // data[index].item - present when update or show | data[index] - when create
                                        initialValue={_.isEmpty(data[index].item) ? [] : [data[index].item]}
                                        options={rItem}
                                        setNonExistingOption={setNonExistingItemOption}
                                        nonExistingOptionIsValid ={nonExistingItemOptionIsValid}
                                        suggestionLabels={["name"]}
                                    />
                                </Col>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="amount" name="amount" title = "Amount"/>,
                        id:"id13",
                        accessor: 'amount',
                        Cell:({row: {index}})=>{
                            return(
                                <Form.Group as={Col} controlId="formGroupName">
                                    <Form.Control
                                        id={"amount_" + index}
                                        type="text"
                                        name="amount"
                                        placeholder="Enter amount"
                                        onChange={(e)=>handleInputFiledChange(e,index)}
                                        onBlur={(e) =>handleInputFiledOnBlur(e,index)}
                                        disabled={disable}
                                        defaultValue={_.isEmpty(data) ? [] : data[index].amount}
                                    />

                                </Form.Group>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unit" name="unit" title = "Unit"/>,
                        id:"id14",
                        accessor: 'unit',
                        Cell:({row: {index}})=>{

                            return(
                                <Col lg={12}>
                                    <TableAutoSuggestion
                                        id={"unit_" + index}
                                        rowId={index}
                                        suggestionName="unitType"
                                        handleSuggestionChange={updateTableRow}
                                        reduxReducer={setUnit}
                                        initialValue={_.isEmpty(data[index].unitType) ? [] : [data[index].unitType]}
                                        options={rUnitTypes}
                                        setNonExistingOption={setNonExistingUnitOption}
                                        nonExistingOptionIsValid ={nonExistingUnitOptionIsValid}
                                        suggestionLabels={["name"]}
                                    />
                                </Col>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unitPrice" name="unitPrice" title = "Unit price"/>,
                        id:"id15",
                        accessor: 'unitPrice',
                        Cell:({row: {index}})=>{

                            return(
                                <Form.Group as={Col} controlId="formGroupName">
                                    <Form.Control
                                        id={"unitPrice_" + index}
                                        type="text"
                                        name="unitPrice"
                                        placeholder="Enter unit price"
                                        disabled={disable}
                                        onChange={(e)=>handleTableInputChange(e,index)}
                                        defaultValue={_.isEmpty(data) ? [] : data[index].unitPrice}
                                    />

                                </Form.Group>
                            )
                        }
                    },
                    {
                        Header: <ItemsTableHeader id="itemCategory" name="itemCategory" title = "Category"/>,
                        id:"id1",
                        accessor: 'itemCategory',
                        Cell:({row: {index}})=>{

                            return(
                                <Col lg={12}>
                                    <TableAutoSuggestion
                                        id={"itemCategory_" + index}
                                        rowId={index}
                                        handleSuggestionChange={updateTableRow}
                                        suggestionName="itemCategory"
                                        reduxReducer={setItemCategory}
                                        initialValue={_.isEmpty(data[index].itemCategory) ? [] : [data[index].itemCategory]}
                                        options={rItemCategories}
                                        setNonExistingOption={setNonExistingCategoryOption}
                                        nonExistingOptionIsValid ={nonExistingItemCategoryOptionIsValid}
                                        suggestionLabels={["name"]}
                                    />
                                </Col>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="totalPrice" name="totalPrice" title = "Price"/>,
                        id:"id17",
                        accessor: 'totalPrice',
                        Cell:({row: {index}})=>{

                            return(
                                <InputGroup>
                                    <Form.Control
                                        id={"price_" + index}
                                        type="text"
                                        name="price"
                                        placeholder="Enter price"
                                        disabled={disable}
                                        onChange={(e)=>handleTableInputChange(e,index)}
                                        defaultValue={_.isEmpty(data) ? [] : data[index].price}
                                    />
                                </InputGroup>
                            )}
                    }
                ],
            },
            {
                id:"id3",
                Header: <ItemsTableHeader id="actions" name="actions" title = "Actions"/>,
                headerClassName:"text-center",
                columns: [
                    {
                        Header: <ItemsTableHeader id="itemRemove" name="itemRemove" title = "Remove"/>,
                        id:"id20",
                        accessor: 'visits',
                        Cell:({row: {index}})=>{
                            return(
                                <RowAction rowId={index} icon={faTrash} color={"red"} onClickHandler={removeSelectedRow}/>
                            )
                        }
                    }
                ],
            },
        ],
        [data]
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    })
    headerGroups.map(headerGroup =>{
        headerGroup.headers.map(column =>{
            }
        )
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th className="text-center" {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr className="text-center border-bottom row-hover" {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default ItemsTable;

ItemsTable.propTypes = exact({

})