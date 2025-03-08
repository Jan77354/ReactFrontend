import { useState } from "react";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PatientsTable from "./components/PatientsTable";

function Patients() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <PatientsTable />
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Patients;