import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import React, {useEffect, useState} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setInitData,clearInitData} from "../../redux/features/utility/appInitDataSlice";
import {expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";
import {mainCategoryThunk} from "../../redux/features/suggestions/mainCategorySuggestionSlice";
import {setFirstName} from "../../redux/features/authentication/registerFormSlice";
import TableToolBar from "../../components/TableToolBars/TableToolBar";
import CreateExpenseTrackerModal from "../../components/Modals/CreateExpenseTrackerModal/CreateExpenseTrackerModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();
    const [expenseTrackerModalIsOpen, setExpenseTrackerModalIsOpen] = useState(false);


    useEffect(()=>{
        dispatch(expenseTrackerThunk());
        dispatch(mainCategoryThunk());

    },[])

    const toggleExpenseTrackerModal = ()=>{
        setExpenseTrackerModalIsOpen(!expenseTrackerModalIsOpen);
    }

    return (
        <>
            <CreateExpenseTrackerModal show={expenseTrackerModalIsOpen} toggleModal={toggleExpenseTrackerModal} />
            <ExpenseTrackerTable toggleExpenseTrackerModal={toggleExpenseTrackerModal}/>
            <ToastContainer
                containerId="toast-container"
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default ExpenseTrackerView;