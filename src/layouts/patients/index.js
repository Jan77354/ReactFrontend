import { useState } from "react";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Import the PatientForm component
import PatientForm from "./components/PatientForm";

// Sample data for initial display
const initialData = {
    columns: [
        { Header: "Name", accessor: "name", width: "25%" },
        { Header: "Email", accessor: "email", width: "25%" },
        { Header: "Phone", accessor: "phone" },
        { Header: "Date of Birth", accessor: "dateOfBirth" },
        { Header: "Actions", accessor: "actions", align: "center" }
    ],
    rows: [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            dateOfBirth: "1985-05-15",
            actions: (
                <MDBox display="flex" justifyContent="center">
                    <MDButton variant="text" color="info" size="small" iconOnly>
                        <Icon>visibility</Icon>
                    </MDButton>
                    <MDButton variant="text" color="warning" size="small" iconOnly>
                        <Icon>edit</Icon>
                    </MDButton>
                    <MDButton variant="text" color="error" size="small" iconOnly>
                        <Icon>delete</Icon>
                    </MDButton>
                </MDBox>
            ),
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            dateOfBirth: "1990-08-22",
            actions: (
                <MDBox display="flex" justifyContent="center">
                    <MDButton variant="text" color="info" size="small" iconOnly>
                        <Icon>visibility</Icon>
                    </MDButton>
                    <MDButton variant="text" color="warning" size="small" iconOnly>
                        <Icon>edit</Icon>
                    </MDButton>
                    <MDButton variant="text" color="error" size="small" iconOnly>
                        <Icon>delete</Icon>
                    </MDButton>
                </MDBox>
            ),
        },
    ],
};

function Patients() {
    const [tableData, setTableData] = useState(initialData);
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddPatient = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFormSubmit = (newPatient) => {
        // Create a new patient entry for the table
        const newPatientRow = {
            name: newPatient.name,
            email: newPatient.email,
            phone: newPatient.phone,
            dateOfBirth: newPatient.dateOfBirth,
            actions: (
                <MDBox display="flex" justifyContent="center">
                    <MDButton variant="text" color="info" size="small" iconOnly>
                        <Icon>visibility</Icon>
                    </MDButton>
                    <MDButton variant="text" color="warning" size="small" iconOnly>
                        <Icon>edit</Icon>
                    </MDButton>
                    <MDButton variant="text" color="error" size="small" iconOnly>
                        <Icon>delete</Icon>
                    </MDButton>
                </MDBox>
            ),
        };

        // Update the table data
        setTableData(prev => ({
            ...prev,
            rows: [...prev.rows, newPatientRow]
        }));
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <MDTypography variant="h4" fontWeight="medium">
                        Patients Management
                    </MDTypography>
                    <MDButton
                        variant="gradient"
                        color="info"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAddPatient}
                    >
                        Add New Patient
                    </MDButton>
                </MDBox>
                <Card>
                    <MDBox p={3}>
                        <DataTable
                            table={tableData}
                            isSorted={true}
                            entriesPerPage={{
                                defaultValue: 5,
                                entries: [5, 10, 15, 20, 25],
                            }}
                            showTotalEntries={true}
                            canSearch
                        />
                    </MDBox>
                </Card>
            </MDBox>

            {/* Patient Form Dialog */}
            <PatientForm
                open={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleFormSubmit}
            />

            <Footer />
        </DashboardLayout>
    );
}

export default Patients;