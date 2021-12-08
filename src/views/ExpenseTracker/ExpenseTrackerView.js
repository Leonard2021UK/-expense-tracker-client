import ExpenseTrackerTable from "../../components/ExpenseTrackerTable/ExpenseTrackerTable";
import {useEffect} from "react";
import {useApiService} from "../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {setInitData,clearInitData} from "../../redux/features/utility/appInitDataSlice";
import {setExpenseTrackers,clearExpenseTrackers} from "../../redux/features/domain/expenseTrackerSlice";
import {setFirstName} from "../../redux/features/authentication/registerFormSlice";
const ExpenseTrackerView = ()=>{

    const dispatch = useDispatch();



    const {getInitData} = useApiService();

    useEffect(()=>{
        console.log("useefect")

        getInitData()
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