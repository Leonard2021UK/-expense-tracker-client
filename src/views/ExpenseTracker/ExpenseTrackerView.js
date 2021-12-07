import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setExpenseTrackers,clearExpenseTrackers} from "../../redux/features/domain/expenseTrackerSlice";
import {setFirstName} from "../../redux/features/authentication/registerFormSlice";
const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();



    const {getAllExpenseTrackers} = useApiService();

    useEffect(()=>{
        console.log("useefect")

        getAllExpenseTrackers()
            .then( (response)=>{
                return response.json();
            }).then( (response)=>{
                dispatch(setExpenseTrackers({expenseTrackers:response}));
                dispatch(setFirstName({firstName:"LEO"}));
                console.log(response)
        })
    })


    return (
        <>
            <ExpenseTrackerTable/>
        </>
    )
}

export default ExpenseTrackerView;