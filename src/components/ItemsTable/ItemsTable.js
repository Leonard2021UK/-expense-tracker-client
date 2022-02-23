import "./ItemsTableStyle.css";
import React, {useEffect, useState} from "react";
import ItemsTableHeader from "./ItemsTableHeader/ItemsTableHeader";
import AutoSuggestion from "../AutoSuggestion/AutoSuggestion";
import {Col, Form, FormControl, InputGroup} from "react-bootstrap";
import {setItemCategory, setItemFormState, setUnitType} from "../../redux/features/domain/forms/itemFormSlice";
import RowAction from "../RowAction/RowAction";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import TableAutoSuggestion from "../TableAutoSuggestion/TableAutoSuggestion";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {setItemTableState,updateSelectedRow,addRow,removeRow,removeSelectedRow,clearTableState} from "../../redux/features/domain/forms/expenseFormSlice";
import CustomTableInputField from "../CustomTableInputField/CustomTableInputField";

const {useTable} = require("react-table");

function ItemsTable(props) {

    const rItemCategories = useSelector((state) => state.suggestions.itemCategory.response);
    const rUnitTypes = useSelector((state) => state.suggestions.unitType.response);
    const rItem = useSelector((state) => state.suggestions.item.response);
    const {itemsTableState,setItemsTableState} = useState({})


    const {
        data,
        errors,
        touched,
        disable,
        formikValues,
        handleChange,
        setFieldValue,
        setFieldTouched,
        setSelectedExpense,
        removeSelectedTableRow,
        setNonExistingItemOption,
        setNonExistingUnitOption,
        setNonExistingCategoryOption,
        nonExistingUnitOptionIsValid,
        nonExistingItemOptionIsValid,
        nonExistingItemCategoryOptionIsValid
    } = props;

    console.log("FORMIK ERROR VALUES IN ITEMS TABLE : ", errors)
    console.log("INITIAL DATA IN ITEMS TABLE : ", data)

    const dispatch = useDispatch();

    const handleInputFiledOnBlur = (inputField) => {
        const keys = Object.keys(inputField);

        const name = keys[0];
        const rowId = inputField.rowId
        const value = inputField[name];
        dispatch(updateSelectedRow({
            rowId:rowId,
            fieldName:name,
            value:[value]
        }))

    }

    const updateTableRow = (selectedItem,rowId,suggestionName)=>{
        setFieldValue(selectedItem)
        dispatch(updateSelectedRow({
            rowId:rowId,
            fieldName:suggestionName,
            value:selectedItem
        }))

    }

    const columns = React.useMemo(
        () => [
            {
                id:"id1",
                Header: <ItemsTableHeader id="itemInfo" name="itemInfo" title = "Item information"/>,
                columns:

                    [
                    {
                        Header: <ItemsTableHeader id="itemNr" name="itemNr" title = "Item Nr." />,
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
                        Header: <ItemsTableHeader id="item" name="item" title = "Item name"/>,
                        id:"id12",
                        accessor: 'item',
                        Cell:({row: {index}})=>{
                            return(
                                <Col lg={12}>
                                    <TableAutoSuggestion
                                        id={"item_" + index}
                                        rowId={index}
                                        // disable={disable}
                                        disable={true}
                                        suggestionName="item"
                                        handleSuggestionChange={updateTableRow}
                                        reduxReducer={setItemFormState}
                                        // data[index].item - present when update or show | data[index] - when create
                                        initialValue={_.isEmpty(data[index].item) ? [] : data[index].item}
                                        options={rItem}
                                        setNonExistingOption={setNonExistingItemOption}
                                        nonExistingOptionIsValid ={nonExistingItemOptionIsValid}
                                        suggestionLabels={["name"]}
                                        errors={errors}
                                        touched={touched}
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
                                <Form.Group as={Col}>
                                    <CustomTableInputField
                                            id={"amount_" + index}
                                            index={index}
                                            type="number"
                                            name="amount"
                                            placeholder="Enter amount"
                                            handleInputFiledOnBlur={(e) =>handleInputFiledOnBlur(e,index)}
                                        // disable={disable}
                                            disable={true}
                                            defaultValue={_.isEmpty(data) ? {} : data[index].amount}
                                            handleChange={handleChange}
                                            formikValues={formikValues}
                                            errors={errors}
                                            touched={touched}
                                    />

                                </Form.Group>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unitType" name="unitType" title = "Unit"/>,
                        id:"id14",
                        accessor: 'unitType',
                        Cell:({row: {index}})=>{

                            return(
                                <Col lg={12}>
                                    <TableAutoSuggestion
                                        id={"unit_" + index}
                                        rowId={index}
                                        // disable={disable}
                                        disable={true}
                                        suggestionName="unitType"
                                        handleSuggestionChange={updateTableRow}
                                        reduxReducer={setUnitType}
                                        initialValue={_.isEmpty(data[index].unitType) ? [] : data[index].unitType}
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
                                <Form.Group as={Col}>
                                    <CustomTableInputField
                                        id={"unitPrice_" + index}
                                        index={index}
                                        type="number"
                                        name="unitPrice"
                                        placeholder="Enter unitPrice"
                                        handleInputFiledOnBlur={(e) =>handleInputFiledOnBlur(e,index)}
                                        // disable={disable}
                                        disable={true}
                                        defaultValue={_.isEmpty(data) ? {} : data[index].unitPrice}
                                        handleChange={handleChange}
                                        formikValues={formikValues}
                                        errors={errors}
                                        touched={touched}
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
                                        // disable={disable}
                                        disable={true}
                                        handleSuggestionChange={updateTableRow}
                                        suggestionName="itemCategory"
                                        reduxReducer={setItemCategory}
                                        initialValue={_.isEmpty(data[index].itemCategory) ? [] : data[index].itemCategory}
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
                                    <CustomTableInputField
                                        id={"price_" + index}
                                        index={index}
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        handleInputFiledOnBlur={(e) =>handleInputFiledOnBlur(e,index)}
                                        // disable={disable}
                                        disable={true}
                                        defaultValue={_.isEmpty(data) ? {} : data[index].price}
                                        handleChange={handleChange}
                                        formikValues={formikValues}
                                        errors={errors}
                                        touched={touched}
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
                                <RowAction
                                    disable={disable}
                                    rowId={index}
                                    icon={faTrash}
                                    color="red"
                                    onClickHandler={() => removeSelectedTableRow(index)}
                                />
                            )
                        }
                    }
                ],
            },
        ],
        [data,errors,touched]
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