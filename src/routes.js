import Admin from "./layout/admin/Admin";
import ExpenseTrackerView from "./views/ExpenseTracker/ExpenseTrackerView";
const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "#home",
        component: Admin,
        layout: "/admin",
        type: ["ROLE_ADMIN","ROLE_USER"],
        submenu: []
    },
    {
        path: "/budgeting",
        name: "Budgeting",
        icon: "#geo-fill",
        component: null,
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
        submenu: [
            {
                path: "/expense-tracker/create",
                name: "List rackers",
                icon: "#speedometer2",
                component: ExpenseTrackerView,
                layout: "/admin",
                type: ["ROLE_ADMIN","ROLE_USER"],
                submenu: []

            }
        ]

    },
    // {
    //     path: "/jobrecords",
    //     name: "Job records",
    //     icon: faPeopleCarry,
    //     component: null,
    //     layout: "/admin",
    //     type: ["Any"],
    //     submenu:[
    //         {
    //             path: "/jobrecords/show",
    //             name: "Show job records",
    //             icon: "tim-icons icon-chart-pie-36",
    //             component: ShowJobRecords,
    //             layout: "/admin",
    //             type: ["Any"],
    //             submenu: []
    //         },
    //         {
    //             path: "/jobrecords/create",
    //             name: "Create job record",
    //             icon: "tim-icons icon-chart-pie-36",
    //             component: CreateJobRecord,
    //             layout: "/admin",
    //             type: ["Admin"],
    //             submenu: []
    //         },
    //         {
    //             path: "/jobrecords/jobregister",
    //             name: "Job registrations",
    //             icon: "tim-icons icon-chart-pie-36",
    //             component: ShowJobRegistration,
    //             layout: "/admin",
    //             type: ["Admin"],
    //             submenu: []
    //         },
    //         {
    //             path: "/jobrecords/mybookings",
    //             name: "Show my bookings",
    //             icon: "tim-icons icon-bullet-list-67",
    //             component: ShowBookings,
    //             layout: "/admin",
    //             type: ["Worker","Site manager"],
    //             submenu: []
    //
    //         }
    //     ]
    // },
    // {
    //     path: "/book-holiday",
    //     name: "Request job",
    //     icon: "tim-icons icon-bullet-list-67",
    //     component: BookHolidays,
    //     layout: "/admin",
    //     type: ["Worker"],
    //     submenu: []
    //
    // },
    // {
    //     path: "/list-receipts",
    //     name: "List receipts",
    //     icon: "tim-icons icon-align-center",
    //     component: ListReceipts,
    //     layout: "/admin"
    // }
];
export default routes;
