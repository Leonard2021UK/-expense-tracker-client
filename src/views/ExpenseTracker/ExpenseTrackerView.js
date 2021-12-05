import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setExpenseTrackers,clearExpenseTrackers} from "../../redux/features/domain/expenseTrackerSlice";

const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();

    const rExpenseTrackers = useSelector((state) => state.expenseTrackers.expenseTrackers);


    const {getAllExpenseTrackers} = useApiService();

    useEffect(()=>{
        getAllExpenseTrackers()
            .then(async (response)=>{
                let res = await response.json();
            dispatch(setExpenseTrackers({expenseTrackers:res}));
            console.log(res)
        })
    })


    return (
        <>
            <ExpenseTrackerTable expenseTrackers={rExpenseTrackers}/>
        </>
    )
}

export default ExpenseTrackerView;