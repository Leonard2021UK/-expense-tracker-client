import "./expensesTableStyle.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ExpenseDetailsModal from "../Modals/ExpenseDetailsModal/ExpenseDetailsModal";
import React, {useEffect, useState} from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import {clearExpenseForm,clearItemTableState} from "../../redux/features/domain/forms/expenseFormSlice";
import {useDispatch, useSelector} from "react-redux";
import {useApiService} from "../../services/useApiService";
import {useResponse} from "../../customHooks/useResponse";
import {expenseTrackersInValidate, expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";

const ExpensesTable = (props)=>{
    const dispatch = useDispatch();
    const {expenseApiModule} =useApiService();
    const {currentExpenseTracker,setCurrentExpenseTracker} = props;
    const [expenseDetailsModalIsOpen, setExpenseDetailsModalIsOpen] = useState(false);
    const rExpenseTrackers = useSelector((state) => state.expenseTrackers.response);

    const [selectedExpense, setSelectedExpense] = useState({});
    const [disable, setDisable] = useState(true);
    const [update, setUpdate] = useState(false);
    const [currentPageContent, setCurrentPageContent] = useState([]);
    const [handleExpenseDeleteResponse] = useResponse();

    const toggleExpenseDetailsModal = ()=>{
        setExpenseDetailsModalIsOpen(!expenseDetailsModalIsOpen);
        dispatch(clearExpenseForm())
        dispatch(clearItemTableState())
        setUpdate(false)
    }

    useEffect(()=>{
        setUpdate(update)
        setCurrentExpenseTracker(currentExpenseTracker)
    },[rExpenseTrackers])
    const handleShowExpenseDetails = (expense)=>{
        setDisable(true)
        setSelectedExpense(expense)
        toggleExpenseDetailsModal();

    }

    const handleUpdateExpenseDetails = (expense)=>{
        setSelectedExpense(expense)
        dispatch(clearExpenseForm())
        dispatch(clearItemTableState())
        toggleExpenseDetailsModal();
        setDisable(false)
        setUpdate(true)
    }

    const handleDeleteExpense = (expense)=>{
        expenseApiModule().deleteExpense(expense.id)
            .then(async (response)=>{

            if(response.ok){
                // updates the new row data
                handleExpenseDeleteResponse(response, "Expense was successfully deleted!")
                dispatch(expenseTrackersInValidate({data:true}));
                dispatch(expenseTrackerThunk());
            }else {
                handleExpenseDeleteResponse(response, null,"Expense couldn't be deleted!")
            }


        });
    }

    return (
        <>
            <ExpenseDetailsModal
                show={expenseDetailsModalIsOpen}
                ownerExpenseTracker={currentExpenseTracker}
                initialValue={selectedExpense}
                setSelectedExpense={setSelectedExpense}
                toggleModal={toggleExpenseDetailsModal}
                disable={disable}
                title={"Expense details for " + selectedExpense.expenseName}
                update={update}
            />


            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Nr.of items</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPageContent.map((expense,index)=>{
                    return <>
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{expense.expenseName}</td>
                            <td>{expense.expenseItems.length}</td>
                            <td>{expense.updatedAt}</td>
                            <td>{expense.createdAt}</td>
                            <td>{expense.createdBy}</td>
                            <td>
                                <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"} onClick={() => handleShowExpenseDetails(expense)} style={{margin:1+"vh",cursor:"pointer"}} />
                                <FontAwesomeIcon icon={faEdit} className="mr-2" color={"orange"} onClick={() => handleUpdateExpenseDetails(expense)} style={{margin:1+"vh",cursor:"pointer"}} />
                                <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"} onClick={() => handleDeleteExpense(expense)} style={{margin:1+"vh",cursor:"pointer"}} style={{margin:1+"vh",cursor:"pointer"}} />
                            </td>
                        </tr>

                    </>
                })}
                </tbody>
            </table>
            <CustomPagination data={currentExpenseTracker.expenses} setCurrentPageContent={setCurrentPageContent}/>
            </>
    )
}

export default ExpensesTable;