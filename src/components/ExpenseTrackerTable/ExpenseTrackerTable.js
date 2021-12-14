import "./expenseTrackerTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faEdit, faMailBulk, faTrash, faArrowUp,faCheck,faTimes,faWindowClose} from "@fortawesome/free-solid-svg-icons";
import ExpenseListModal from "../Modals/ExpenseModal/ExpensesModal";
import React, {useEffect, useState} from "react";
import {setExpenseTrackers} from "../../redux/features/domain/expenseTrackerSlice";
import {useSelector} from "react-redux";
import ExpenseTrackerTableToolBar from "../TableToolBars/ExpenseTrackerTableToolBar";
import CustomPagination from "../CustomPagination/CustomPagination";
const ExpenseTrackerTable = (props)=>{
    const {toggleExpenseTrackerModal} = props;
    const rExpenseTrackers = useSelector((state) => state.expenseTrackers.response);
    console.log(rExpenseTrackers)
    const [expensesModalIsOpen, setExpensesModalIsOpen] = useState(false);
    const [expenses, setExpenses]= useState([]);

    const toggleExpenseListModal = ()=>{
        setExpensesModalIsOpen(!expensesModalIsOpen);

    }

    const handleShowExpenses = (expenseTracker)=>{
        toggleExpenseListModal()
        setExpenses(expenseTracker.expenses)
    }


    return (
      <>
          <ExpenseListModal show={expensesModalIsOpen} expenses={expenses} toggleModal={toggleExpenseListModal}/>
          {/*<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">*/}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h3" data-cy="page-header">Expense trackers</h1>
              </div>
             <ExpenseTrackerTableToolBar toggleExpenseTrackerModal={toggleExpenseTrackerModal}/>

              <table className="table table-striped table-dark">

                  <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Updated at</th>
                      <th scope="col">Created at</th>
                      <th scope="col">Created by</th>
                      <th scope="col">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rExpenseTrackers.map((expenseTracker,index)=>{
                      return <>
                          <tr>
                              <th scope="row">{index}</th>
                              <td>{expenseTracker.name}</td>
                              <td>{expenseTracker.mainCategoryId}</td>
                              <td>{expenseTracker.updatedAt}</td>
                              <td>{expenseTracker.createdAt}</td>
                              <td>{expenseTracker.createdBy}</td>
                              <td>
                                  <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"} style={{margin:1+"vh",cursor:"pointer"}} onClick={handleShowExpenses.bind(this,expenseTracker)}/>
                                  <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"} style={{margin:1+"vh",cursor:"pointer"}} />
                              </td>
                          </tr>

                      </>
                  })}
                  </tbody>
              </table>
          <CustomPagination rExpenseTrackers={rExpenseTrackers}/>

          {/*</main>*/}
      </>
    )
}

export default ExpenseTrackerTable;