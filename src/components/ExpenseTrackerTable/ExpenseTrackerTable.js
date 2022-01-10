import "./expenseTrackerTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faEdit,
    faMailBulk,
    faTrash,
    faArrowUp,
    faCheck,
    faTimes,
    faWindowClose,
    faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import ExpenseListModal from "../Modals/ExpensesListModal/ExpensesListModal";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import TableToolBar from "../TableToolBars/TableToolBar";
import CustomPagination from "../CustomPagination/CustomPagination";
import CreateExpenseModal from "../Modals/CreateExpenseModal/CreateExpenseModal";
import ExpenseDetailsModal from "../Modals/ExpenseDetailsModal/ExpenseDetailsModal";
import {clearExpenseForm} from "../../redux/features/domain/forms/expenseFormSlice";
import {useDispatch} from "react-redux";
import {clearItemTableState} from "../../redux/features/domain/tables/itemsTableSlice";

const ExpenseTrackerTable = (props) => {

    const dispatch = useDispatch();
    const {toggleExpenseTrackerModal} = props;

    const rExpenseTrackers = useSelector((state) => state.expenseTrackers.response);

    const [expensesModalIsOpen, setExpensesModalIsOpen] = useState(false);
    const [currentPageContent, setCurrentPageContent] = useState([]);
    const [createExpenseModalIsOpen, setCreateExpenseModalIsOpen] = useState(false);
    const [currentExpenseTracker, setCurrentExpenseTracker] = useState({});
    const [disabledFields, setDisabledFields] = useState(false);


    const toggleExpenseDetailsModal = ()=>{
        setCreateExpenseModalIsOpen(!createExpenseModalIsOpen);

    }

    const handleCreateExpense = (expenseTracker) =>{
        setCurrentExpenseTracker(expenseTracker)
        dispatch(clearExpenseForm())
        dispatch(clearItemTableState())

        toggleExpenseDetailsModal();
        setDisabledFields(false)
    }

    const toggleExpenseListModal = () => {
        setExpensesModalIsOpen(!expensesModalIsOpen);
    }

    const handleShowExpenses = (expenseTracker) => {
        setCurrentExpenseTracker(expenseTracker)
        toggleExpenseListModal()
        setDisabledFields(true)
    }


    return (
        <>
            <ExpenseListModal show={expensesModalIsOpen} currentExpenseTracker={currentExpenseTracker} toggleModal={toggleExpenseListModal}/>
            <ExpenseDetailsModal
                show={createExpenseModalIsOpen}
                toggleModal={toggleExpenseDetailsModal}
                ownerExpenseTracker={currentExpenseTracker}
                disable={disabledFields}
                title="Add new expense into the tracker"
            />
            {/*<CreateExpenseModal*/}
            {/*    show={createExpenseModalIsOpen}*/}
            {/*    toggleModal={toggleExpenseDetailsModal}*/}
            {/*    currentExpenseTracker={currentExpenseTracker}*/}
            {/*    disabled={disabledFields}*/}
            {/*/>*/}
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
                    <th scope="col">Nr. of expenses</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPageContent.map((expenseTracker, index) => {
                    return <>
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{expenseTracker.name}</td>
                            <td>{expenseTracker.mainCategory.name}</td>
                            <td>{expenseTracker.expenses.length}</td>
                            <td>{expenseTracker.updatedAt}</td>
                            <td>{expenseTracker.createdAt}</td>
                            <td>{expenseTracker.createdBy}</td>
                            <td>
                                <FontAwesomeIcon icon={faPlusSquare} className="mr-2" color={"red"}
                                                 style={{margin: 1 + "vh", cursor: "pointer"}}
                                                 onClick={() => handleCreateExpense(expenseTracker)}/>
                                <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"}
                                                 style={{margin: 1 + "vh", cursor: "pointer"}}
                                                 onClick={() => handleShowExpenses(expenseTracker)}/>
                                <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"}
                                                 style={{margin: 1 + "vh", cursor: "pointer"}}/>
                            </td>
                        </tr>
                    </>
                })}
                </tbody>
            </table>
            <CustomPagination data={rExpenseTrackers} setCurrentPageContent={setCurrentPageContent}/>

            {/*</main>*/}
        </>
    )
}

export default ExpenseTrackerTable;