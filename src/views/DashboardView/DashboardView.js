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
import {clearExpenseTrackerForm} from "../../redux/features/domain/forms/expenseTrackerFormSlice";
import DashboardGridCards from "../../components/DashboardGridCards/DashboardGridCards";

const DashboardView = ()=>{

    const dispatch = useDispatch();




    return (
        <DashboardGridCards/>
    )
}

export default DashboardView;