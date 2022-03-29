import {Tab, Tabs} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import CustomTabContent from "../../components/CustomTabContent/CustomTabContent";
import {unitTypeThunk} from "../../redux/features/suggestions/unitSuggestionSlice";
import {itemCategoryThunk} from "../../redux/features/suggestions/itemCategorySuggestionSlice";
import {itemThunk} from "../../redux/features/suggestions/itemSuggestionSlice";
import {expenseAddressThunk} from "../../redux/features/suggestions/expenseAddressSuggestionSlice";
import {expensePaymentTypeThunk} from "../../redux/features/suggestions/expensePaymentTypeSuggestionSlice";
import {expenseTypeThunk} from "../../redux/features/suggestions/expenseTypeSuggestionSlice";
import {itemCategoryInValidate} from "../../redux/features/suggestions/itemCategorySuggestionSlice";
import {unitTypeInValidate} from "../../redux/features/suggestions/unitSuggestionSlice";
import {itemInValidate} from "../../redux/features/suggestions/itemSuggestionSlice";
import {expenseAddressInValidate} from "../../redux/features/suggestions/expenseAddressSuggestionSlice";
import {expensePaymentTypeInValidate} from "../../redux/features/suggestions/expensePaymentTypeSuggestionSlice";
import {expenseTypeInValidate} from "../../redux/features/suggestions/expenseTypeSuggestionSlice";
import {mainCategoryInValidate, mainCategoryThunk} from "../../redux/features/suggestions/mainCategorySuggestionSlice";
import {ToastContainer} from "react-toastify";
import {useResponse} from "../../customHooks/useResponse";
import {useApiService} from "../../services/useApiService";

const SettingsView = ()=>{

    const dispatch = useDispatch();

    const rItemCategories = useSelector((state) => state.suggestions.itemCategory.response);
    const rUnitTypes = useSelector((state) => state.suggestions.unitType.response);
    const rItem = useSelector((state) => state.suggestions.item.response);
    const rExpenseAddresses = useSelector((state) => state.suggestions.expenseAddress.response);
    const rExpensePaymentType= useSelector((state) => state.suggestions.expensePaymentType.response);
    const rExpenseType = useSelector((state) => state.suggestions.expenseType.response);
    const rMainCategory = useSelector((state) => state.suggestions.mainCategory.response);
    const [handleNewDataDeleteResponse] = useResponse();
    const {deleteData} =useApiService();

    useEffect(()=>{
        dispatch(itemCategoryThunk());
        dispatch(unitTypeThunk());
        dispatch(itemThunk());
        dispatch(expenseAddressThunk());
        dispatch(expensePaymentTypeThunk());
        dispatch(expenseTypeThunk());
        dispatch(mainCategoryThunk());
    },[])



    const handleDeleteData = (data,url,toDispatch,options) => {

        deleteData(data,url)
            .then(async (response)=>{

                if(response.ok){
                    // updates the new row data
                    handleNewDataDeleteResponse(response, options.cardHeader + " was successfully deleted!")
                    // setSavedNewMainCategory( [parsedResponse]);
                    dispatch(toDispatch.invalidate({data:true}));
                    dispatch(toDispatch.fetch());
                }else {
                    handleNewDataDeleteResponse(response, null,options.cardHeader + " couldn't be deleted!")
                }


            });

    }
    return(

        <>
            <Tabs
                defaultActiveKey="categories"
                transition={true}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="categories" title="Item categories">
                    <CustomTabContent
                        url={process.env.REACT_APP_ITEM_CATEGORY}
                        toDispatch={{invalidate:itemCategoryInValidate,fetch:itemCategoryThunk}}
                        options={{
                            cardHeader:"Item category",
                            cardTitle:"User defined item categories",
                            cardText:"Here you can remove item categories."
                        }}
                        dataCollection={rItemCategories}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="unitTypes" title="Unit types">
                    <CustomTabContent
                        url={process.env.REACT_APP_UNIT_TYPE}
                        toDispatch={{invalidate:unitTypeInValidate,fetch:unitTypeThunk}}
                        options={{
                            cardHeader:"Unit types",
                            cardTitle:"User defined unit types",
                            cardText:"Here you can remove unit types."
                        }}
                        dataCollection={rUnitTypes}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="items" title="Items">
                    <CustomTabContent
                        url={process.env.REACT_APP_ITEM}
                        toDispatch={{invalidate:itemInValidate,fetch:itemThunk}}
                        options={{
                            cardHeader:"Items",
                            cardTitle:"User defined items",
                            cardText:"Here you can remove items."
                        }}
                        dataCollection={rItem}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="expenseAddresses" title="Expense addresses">
                    <CustomTabContent
                        url={process.env.REACT_APP_EXPENSE_ADDRESS}
                        toDispatch={{invalidate:expenseAddressInValidate,fetch:expenseAddressThunk}}
                        options={{
                            cardHeader:"Expense addresses",
                            cardTitle:"User defined expense addresses",
                            cardText:"Here you can remove expense addresses."
                        }}
                        dataCollection={rExpenseAddresses}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="paymentTypes" title="Payment types">
                    <CustomTabContent
                        url={process.env.REACT_APP_PAYMENT_TYPE}
                        toDispatch={{invalidate:expensePaymentTypeInValidate,fetch:expensePaymentTypeThunk}}
                        options={{
                            cardHeader:"Payment types",
                            cardTitle:"User defined payment types",
                            cardText:"Here you can remove payment types."
                        }}
                        dataCollection={rExpensePaymentType}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="expenseTypes" title="Expense types">
                    <CustomTabContent
                        url={process.env.REACT_APP_EXPENSE_TYPE}
                        toDispatch={{invalidate:expenseTypeInValidate,fetch:expenseTypeThunk}}
                        options={{
                            cardHeader:"Expense types",
                            cardTitle:"User defined expense types",
                            cardText:"Here you can remove expense types."
                        }}
                        dataCollection={rExpenseType}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
                <Tab eventKey="mainCategory" title="Main category">
                    <CustomTabContent
                        url={process.env.REACT_APP_MAIN_CATEGORY}
                        toDispatch={{invalidate:mainCategoryInValidate,fetch:mainCategoryThunk}}
                        options={{
                            cardHeader:"Main category",
                            cardTitle:"User defined main category",
                            cardText:"Here you can remove main categories."
                        }}
                        dataCollection={rMainCategory}
                        handleDeleteData={handleDeleteData}
                    />
                </Tab>
            </Tabs>
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

export default SettingsView;
