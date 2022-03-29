import Admin from "./layout/admin/Admin";
import ExpenseTrackerView from "./views/ExpenseTracker/ExpenseTrackerView";
import DashboardView from "./views/DashboardView/DashboardView";
import BudgetingView from "./views/BudgetingView/BudgetingView";
import SettingsView from "./views/SettingsView/SettingsView";
const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "#home",
        component: DashboardView,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu: []
    },
    {
        path: "/budgeting",
        name: "Budgeting",
        icon: "#geo-fill",
        component:BudgetingView,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu:[]
    },
    {
        path: "/expense-tracker",
        name: "Expense tracking",
        icon: "#speedometer2",
        component: ExpenseTrackerView,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu: [ ]

    },
    {
        path: "/settings",
        name: "Settings",
        icon: "#speedometer2",
        component: SettingsView,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu: [ ]

    }
];
export default routes;
