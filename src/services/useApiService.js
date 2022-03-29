
import generalDataApiModule from "../services/domain/generalModule.mjs";
import expenseApiModule from "./domain/expenseModule.mjs";
import mainCategoryApiModule from "./domain/mainCategoryModule.mjs";
import itemCategoryApiModule from "./domain/itemCategoryModule.mjs";
import paymentTypeApiModule from "./domain/paymentTypesModule.mjs";
import itemApiModule from "./domain/itemsModule.mjs";
import expenseTrackerApiModule from "./domain/expenseTrackerModule";
import unitTypeApiModule from "./domain/unitTypeModule.mjs";
import expenseAddressApiModule from "./domain/expenseAddressModule.mjs";
export function useApiService() {

    return {
        generalDataApiModule,
        expenseApiModule,
        mainCategoryApiModule,
        itemCategoryApiModule,
        paymentTypeApiModule,
        itemApiModule,
        expenseTrackerApiModule,
        unitTypeApiModule,
        expenseAddressApiModule,
    }
}
