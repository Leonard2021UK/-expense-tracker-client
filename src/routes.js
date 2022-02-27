import Admin from "./layout/admin/Admin";
import ExpenseTrackerView from "./views/ExpenseTracker/ExpenseTrackerView";
import DashboardGridCards from "./components/DashboardGridCards/DashboardGridCards";
const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "#home",
        component: DashboardGridCards,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu: []
    },
    {
        path: "/budgeting",
        name: "Budgeting",
        icon: "#geo-fill",
        component:null
        ,
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

    }
];
export default routes;
