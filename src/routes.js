/**
 =========================================================
 * Material Dashboard 2 PRO React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

/**
 All of the routes for the Material Dashboard 2 PRO React are added here,
 You can add a new route, customize the routes and delete the routes here.

 Once you add a new route on this file it will be visible automatically on
 the Sidenav.

 For adding a new route you can follow the existing routes in the routes array.
 1. The `type` key with the `collapse` value is used for a route.
 2. The `type` key with the `title` value is used for a title inside the Sidenav.
 3. The `type` key with the `divider` value is used for a divider between Sidenav items.
 4. The `name` key is used for the name of the route on the Sidenav.
 5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
 6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
 7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
 inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
 8. The `route` key is used to store the route location which is used for the react router.
 9. The `href` key is used to store the external links location.
 10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
 10. The `component` key is used to store the component of its route.
 */

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Calendar from "layouts/applications/calendar";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import ResetCover from "layouts/authentication/reset-password/cover";
import Patients from "layouts/patients";
import PatientDetail from "layouts/patients/components/PatientDetail";

// New Imports for Messages, Emails, and Notifications
import Messages from "layouts/communications/messages";
import Emails from "layouts/communications/emails";
import Notifications from "layouts/communications/notifications";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode } from "@fortawesome/free-brands-svg-icons";

import UserProfile from "cruds/user-profile";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";

const routes = [
    {
        type: "collapse",
        name: "Bruce Mars",
        key: "user-name",
        icon: <MDAvatar src={profilePicture} alt="Bruce Mars" size="sm" />,
        collapse: [
            {
                name: "My Profile",
                key: "profile-overview",
                route: "/pages/profile/profile-overview",
                component: <ProfileOverview />,
            },
            {
                name: "Logout",
                key: "logout",
            },
        ],
    },
    { type: "divider", key: "divider-0" },
    {
        type: "collapse",
        name: "Dashboards",
        key: "dashboards",
        icon: <Icon fontSize="medium">dashboard</Icon>,
        collapse: [
            {
                name: "Analytics",
                key: "analytics",
                route: "/dashboards/analytics",
                component: <Analytics />,
            },
            {
                name: "Sales",
                key: "sales",
                route: "/dashboards/sales",
                component: <Sales />,
            },
        ],
    },
    {
        type: "collapse",
        name: "Patients",
        key: "patients",
        icon: <Icon fontSize="medium">people</Icon>,
        noCollapse: true,
        route: "/patients",
        component: <Patients />,
    },
    {
        type: "collapse",
        name: "Clinics",
        key: "clinics",
        icon: <Icon fontSize="medium">business</Icon>,
        collapse: [
            {
                name: "Trier",
                key: "trier-clinic",
                route: "/clinics/trier",
                component: null,
            },
            {
                name: "Ramstein",
                key: "ramstein-clinic",
                route: "/clinics/ramstein",
                component: null,
            },
            {
                name: "Wittlich",
                key: "wittlich-clinic",
                route: "/clinics/wittlich",
                component: null,
            },
            {
                name: "Wiesbaden",
                key: "wiesbaden-clinic",
                route: "/clinics/wiesbaden",
                component: null,
            },
        ],
    },
    // New section for Communications
    {
        type: "collapse",
        name: "Communications",
        key: "communications",
        icon: <Icon fontSize="medium">chat</Icon>,
        collapse: [
            {
                name: "Messages",
                key: "messages",
                route: "/communications/messages",
                component: <Messages />,
            },
            {
                name: "Emails",
                key: "emails",
                route: "/communications/emails",
                component: <Emails />,
            },
            {
                name: "Notifications",
                key: "notifications",
                route: "/communications/notifications",
                component: <Notifications />,
            },
        ],
    },
    {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <Icon fontSize="medium">receipt_long</Icon>,
        collapse: [
            {
                name: "Billing",
                key: "billing-page",
                route: "/pages/account/billing",
                component: <Billing />,
            },
            {
                name: "Invoice",
                key: "invoice",
                route: "/pages/account/invoice",
                component: <Invoice />,
            },
        ],
    },
    {
        type: "collapse",
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        icon: <Icon fontSize="medium">calendar_month</Icon>,
        noCollapse: true,
        component: <Calendar />,
    },
    {
        type: "collapse",
        name: "Account",
        key: "account",
        icon: <Icon fontSize="medium">account_circle</Icon>,
        collapse: [
            {
                name: "User Profile",
                key: "user-profile",
                route: "/account/user-profile",
                component: <UserProfile />,
            },
            {
                name: "Reset Password",
                key: "reset-password",
                route: "/authentication/reset-password/cover",
                component: <ResetCover />,
            },
            {
                name: "Settings",
                key: "settings",
                route: "/pages/account/settings",
                component: <Settings />,
            },
        ],
    },
    // Patient detail and edit routes
    {
        key: "patient-view",
        route: "/patients/:id/view",
        component: <PatientDetail />,
    },
    // Authentication routes
    {
        key: "sign-in-basic",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
    },
    {
        key: "sign-in-cover",
        route: "/authentication/sign-in/cover",
        component: <SignInCover />,
    },
];

export default routes;