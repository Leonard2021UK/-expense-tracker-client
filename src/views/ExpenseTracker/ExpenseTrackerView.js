import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch} from "react-redux";
import {setExpenseTrackers,clearExpenseTrackers} from "../../redux/features/authentication/expenseTrackerSlice";

const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();

    const {getAllExpenseTrackers} = useApiService();

    useEffect(()=>{
        getAllExpenseTrackers()
            .then(async (response)=>{
                let res = await response.json();
            dispatch(setExpenseTrackers(res));
            console.log(res)
        })
    })


    return (
        <>
            <ExpenseTrackerTable/>
        </>
    )
}

export default ExpenseTrackerView;