import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setInitData,clearInitData} from "../../redux/features/utility/appInitDataSlice";
import {expenseTrackerThunk} from "../../redux/features/domain/expenseTrackerSlice";
import {setFirstName} from "../../redux/features/authentication/registerFormSlice";
const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("CALLING THUNK")
        dispatch(expenseTrackerThunk());

    },[])


    return (
        <>
            <ExpenseTrackerTable/>
        </>
    )
}

export default ExpenseTrackerView;