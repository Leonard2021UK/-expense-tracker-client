import "./expensesTableStyle.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faEdit, faMailBulk, faTrash, faArrowUp,faCheck,faTimes,faWindowClose} from "@fortawesome/free-solid-svg-icons";
import ExpenseDetailsModal from "../Modals/ExpenseDetailsModal/ExpenseDetailsModal";
import React, {useState} from "react";
import TableToolBar from "../TableToolBars/TableToolBar";
import CustomPagination from "../CustomPagination/CustomPagination";
import CreateExpenseModal from "../Modals/CreateExpenseModal/CreateExpenseModal";

const ExpensesTable = (props)=>{
    const {expenses} = props;
    console.log(expenses)
    const [expenseDetailsModalIsOpen, setExpenseDetailsModalIsOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState({});
    const [disable, setDisable] = useState(true);
    const [currentPageContent, setCurrentPageContent] = useState([]);
    const [createExpenseModalIsOpen, setCreateExpenseModalIsOpen] = useState(false);

    const toggleExpenseDetailsModal = ()=>{
        setExpenseDetailsModalIsOpen(!expenseDetailsModalIsOpen);
    }

    const toggleCreateExpenseModal = ()=>{
        console.log("HELLO")
        setCreateExpenseModalIsOpen(!createExpenseModalIsOpen);
    }
    const handleShowExpenseDetails = (expense)=>{
        setSelectedExpense(expense)
        toggleExpenseDetailsModal();

        console.log(expense)
    }
    return (
        <>
        {/*// <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">*/}
            {/*<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">*/}
            {/*    <h1 className="h3" data-cy="page-header">Expenses</h1>*/}
            {/*</div>*/}
            <ExpenseDetailsModal
                show={expenseDetailsModalIsOpen}
                expense={selectedExpense}
                toggleModal={toggleExpenseDetailsModal}
                disable={disable}
            />

            <TableToolBar toggleModal={toggleCreateExpenseModal} />

            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Nr. of items</th>
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
                            <td>{expense.name}</td>
                            <td>{expense.expenseItems.length}</td>
                            <td>{expense.updatedAt}</td>
                            <td>{expense.createdAt}</td>
                            <td>{expense.createdBy}</td>
                            <td>
                                <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"} onClick={() => handleShowExpenseDetails(expense)} style={{margin:1+"vh",cursor:"pointer"}} />
                                <FontAwesomeIcon icon={faEdit} className="mr-2" color={"orange"} style={{margin:1+"vh",cursor:"pointer"}} />
                                <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"} style={{margin:1+"vh",cursor:"pointer"}} />
                            </td>
                        </tr>

                    </>
                })}
                </tbody>
            </table>
            <CustomPagination data={expenses} setCurrentPageContent={setCurrentPageContent}/>

        {/*// </main>*/}
            </>
    )
}

export default ExpensesTable;