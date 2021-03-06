import "./expenseTrackerTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faTrash,
    faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import ExpenseListModal from "../Modals/ExpensesListModal/ExpensesListModal";
import React, {useEffect, useState} from "react";
import TableToolBar from "../TableToolBars/TableToolBar";
import CustomPagination from "../CustomPagination/CustomPagination";
import ExpenseDetailsModal from "../Modals/ExpenseDetailsModal/ExpenseDetailsModal";
import {useDispatch} from "react-redux";
import {clearItemTableState,clearExpenseForm} from "../../redux/features/domain/forms/expenseFormSlice";
import _ from 'lodash';
import {useApiService} from "../../services/useApiService";
import {useResponse} from "../../customHooks/useResponse";
import {expenseTrackersInValidate, expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";
import {ToastContainer} from "react-toastify";

const ExpenseTrackerTable = (props) => {

    const dispatch = useDispatch();
    const {toggleExpenseTrackerModal,rExpenseTrackers} = props;


    const [expensesModalIsOpen, setExpensesModalIsOpen] = useState(false);
    const [currentPageContent, setCurrentPageContent] = useState([]);
    const [createExpenseModalIsOpen, setCreateExpenseModalIsOpen] = useState(false);
    const [currentExpenseTracker, setCurrentExpenseTracker] = useState({});
    const [disabledFields, setDisabledFields] = useState(false);
    const [handleDeleteExpenseTrackerResponse] = useResponse();

    const  {expenseTrackerApiModule} = useApiService();

    const toggleExpenseDetailsModal = ()=>{
        setCreateExpenseModalIsOpen(!createExpenseModalIsOpen);
    }

    const handleCreateExpenseTracker = (expenseTracker) =>{
        setCurrentExpenseTracker(expenseTracker)
        dispatch(clearExpenseForm())
        dispatch(clearItemTableState())

        toggleExpenseDetailsModal();
        setDisabledFields(false)
    }

    const toggleExpenseListModal = () => {
        setExpensesModalIsOpen(!expensesModalIsOpen);
    }

    const handleDeleteExpensesTracker = (expenseTracker) =>{
        expenseTrackerApiModule().deleteExpenseTracker(expenseTracker.id)
            .then(async (response) =>{
                if(response.ok){
                    handleDeleteExpenseTrackerResponse(response,"Expense tracker was successfully deleted!")
                    dispatch(expenseTrackersInValidate({data:true}))
                    dispatch(expenseTrackerThunk())

                }else{
                    handleDeleteExpenseTrackerResponse(response, null,"Expense tracker couldn't be deleted!")
                }
                //TODO error handling
            });
    }

    const handleShowExpensesTracker = (expenseTracker) => {
        setCurrentExpenseTracker(expenseTracker)
        toggleExpenseListModal()
        setDisabledFields(true)
    }

    useEffect(()=>{

        if(!_.isUndefined(currentExpenseTracker)){
            setCurrentExpenseTracker(rExpenseTrackers.find((expenseTracker)=>
                expenseTracker.id === currentExpenseTracker.id
            ))
        }

    },[rExpenseTrackers])

    return (
        <>

            <ExpenseListModal
                show={expensesModalIsOpen}
                currentExpenseTracker={currentExpenseTracker}
                toggleModal={toggleExpenseListModal}
                setCurrentExpenseTracker={setCurrentExpenseTracker}
            />
            <ExpenseDetailsModal
                show={createExpenseModalIsOpen}
                toggleModal={toggleExpenseDetailsModal}
                ownerExpenseTracker={currentExpenseTracker}
                disable={disabledFields}
                title="Add new expense into the tracker"
            />

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h3" data-cy="page-header">Expense trackers</h1>
            </div>
            <TableToolBar add={toggleExpenseTrackerModal}/>

            <table className="table table-striped table-dark">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Nr.of expenses</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    (!_.isNull(currentPageContent)) ?

                    currentPageContent.map((expenseTracker, index) => {
                        return <>
                            <tr key={index}>
                                <td scope="row">{index+1}</td>
                                <td>{expenseTracker.name}</td>
                                <td>{expenseTracker.mainCategory.name}</td>
                                <td>{expenseTracker.expenses.length}</td>
                                <td>{expenseTracker.updatedAt}</td>
                                <td>{expenseTracker.createdAt}</td>
                                <td>{expenseTracker.createdBy}</td>
                                <td>
                                    <FontAwesomeIcon icon={faPlusSquare} className="mr-2" color={"red"}
                                                     style={{margin: 1 + "vh", cursor: "pointer"}}
                                                     onClick={() => handleCreateExpenseTracker(expenseTracker)}/>
                                    <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"}
                                                     style={{margin: 1 + "vh", cursor: "pointer"}}
                                                     onClick={() => handleShowExpensesTracker(expenseTracker)}/>
                                    <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"}
                                                     style={{margin: 1 + "vh", cursor: "pointer"}}
                                                     onClick={() => handleDeleteExpensesTracker(expenseTracker)}/>
                                </td>
                            </tr>
                        </>
                    }) : null
                }
                </tbody>
            </table>
            <CustomPagination data={rExpenseTrackers} setCurrentPageContent={setCurrentPageContent}/>
            <ToastContainer
                containerId="toast-container"
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
            />
        </>
    )
}

export default ExpenseTrackerTable;