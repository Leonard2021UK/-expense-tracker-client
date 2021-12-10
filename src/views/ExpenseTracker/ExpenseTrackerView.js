import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect, useState} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setInitData,clearInitData} from "../../redux/features/utility/appInitDataSlice";
import {expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";
import {mainCategoryThunk} from "../../redux/features/suggestions/mainCategorySuggestionSlice";
import {setFirstName} from "../../redux/features/authentication/registerFormSlice";
import ExpenseTrackerTableToolBar from "../../components/TableToolBars/ExpenseTrackerTableToolBar";
import CreateExpenseTrackerModal from "../../components/Modals/CreateExpenseTrackerModal/CreateExpenseTrackerModal";
const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();

    const [expenseTrackerModalIsOpen, setExpenseTrackerModalIsOpen] = useState(false);


    useEffect(()=>{
        console.log("CALLING THUNK")
        dispatch(expenseTrackerThunk());
        dispatch(mainCategoryThunk());


    },[])

    const toggleExpenseTrackerModal = ()=>{
        setExpenseTrackerModalIsOpen(!expenseTrackerModalIsOpen);
    }

    return (
        <>
            <CreateExpenseTrackerModal show={expenseTrackerModalIsOpen} handleClose={toggleExpenseTrackerModal}/>
            <ExpenseTrackerTable toggleExpenseTrackerModal={toggleExpenseTrackerModal}/>
        </>
    )
}

export default ExpenseTrackerView;