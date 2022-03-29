import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";
import {mainCategoryThunk} from "../../redux/features/suggestions/mainCategorySuggestionSlice";
import CreateExpenseTrackerModal from "../../components/Modals/CreateExpenseTrackerModal/CreateExpenseTrackerModal";
import 'react-toastify/dist/ReactToastify.css';
import {clearExpenseTrackerForm} from "../../redux/features/domain/forms/expenseTrackerFormSlice";
import PageLoadingSpinner from "../../components/Spinner/PageLoadingSpinner";

const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();
    const [expenseTrackerModalIsOpen, setExpenseTrackerModalIsOpen] = useState(false);
    const rExpenseTrackers = useSelector((state) => state.expenseTrackers);


    useEffect(()=>{
        dispatch(expenseTrackerThunk());
        dispatch(mainCategoryThunk());
    },[])


    const toggleExpenseTrackerModal = ()=>{
        setExpenseTrackerModalIsOpen(!expenseTrackerModalIsOpen);
        dispatch(clearExpenseTrackerForm())
    }

    return (
        <>
            <PageLoadingSpinner hidden={rExpenseTrackers.isFetching} />
            <CreateExpenseTrackerModal show={expenseTrackerModalIsOpen} toggleModal={toggleExpenseTrackerModal} />
            <ExpenseTrackerTable toggleExpenseTrackerModal={toggleExpenseTrackerModal} rExpenseTrackers={rExpenseTrackers.response}/>

        </>
    )
}

export default ExpenseTrackerView;