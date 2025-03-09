// Update the patients file to include unique IDs for each patient and working action buttons

import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PatientForm from "./components/PatientForm";

function Patients() {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [tableData, setTableData] = useState({
        columns: [
            { Header: "Name", accessor: "name", width: "25%" },
            { Header: "Email", accessor: "email", width: "25%" },
            { Header: "Phone", accessor: "phone" },
            { Header: "Date of Birth", accessor: "dateOfBirth" },
            { Header: "Actions", accessor: "actions", align: "center" }
        ],
        rows: []
    });

    useEffect(() => {
        // Load patients from localStorage on component mount
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");

        // Map the stored patients to table rows with action buttons
        const rows = storedPatients.map(patient => ({
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            dateOfBirth: patient.dateOfBirth,
            actions: (
                <MDBox display="flex" justifyContent="center">
                    <MDButton
                        variant="text"
                        color="info"
                        size="small"
                        iconOnly
                        onClick={() => handleViewPatient(patient.id)}
                    >
                        <Icon>visibility</Icon>
                    </MDButton>
                    <MDButton
                        variant="text"
                        color="warning"
                        size="small"
                        iconOnly
                        onClick={() => handleEditPatient(patient.id)}
                    >
                        <Icon>edit</Icon>
                    </MDButton>
                    <MDButton
                        variant="text"
                        color="error"
                        size="small"
                        iconOnly
                        onClick={() => handleDeletePatient(patient.id)}
                    >
                        <Icon>delete</Icon>
                    </MDButton>
                </MDBox>
            )
        }));

        setTableData(prev => ({ ...prev, rows }));
    }, []);

    const handleAddPatient = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFormSubmit = (newPatient) => {
        // Generate a unique ID for the new patient
        const patientId = Date.now().toString();

        // Create full patient object with ID
        const patientWithId = {
            id: patientId,
            ...newPatient
        };

        // Save to localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        localStorage.setItem("patients", JSON.stringify([...storedPatients, patientWithId]));

        // Update the table data
        const newRow = {
            name: newPatient.name,
            email: newPatient.email,
            phone: newPatient.phone,
            dateOfBirth: newPatient.dateOfBirth,
            actions: (
                <MDBox display="flex" justifyContent="center">
                    <MDButton
                        variant="text"
                        color="info"
                        size="small"
                        iconOnly
                        onClick={() => handleViewPatient(patientId)}
                    >
                        <Icon>visibility</Icon>
                    </MDButton>
                    <MDButton
                        variant="text"
                        color="warning"
                        size="small"
                        iconOnly
                        onClick={() => handleEditPatient(patientId)}
                    >
                        <Icon>edit</Icon>
                    </MDButton>
                    <MDButton
                        variant="text"
                        color="error"
                        size="small"
                        iconOnly
                        onClick={() => handleDeletePatient(patientId)}
                    >
                        <Icon>delete</Icon>
                    </MDButton>
                </MDBox>
            ),
        };

        setTableData(prev => ({
            ...prev,
            rows: [...prev.rows, newRow]
        }));
    };

    const handleViewPatient = (id) => {
        navigate(`/patients/${id}/view`);
    };

    const handleEditPatient = (id) => {
        navigate(`/patients/${id}/edit`);
    };

    const handleDeletePatient = (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            // Remove from localStorage
            const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
            const updatedPatients = storedPatients.filter(p => p.id !== id);
            localStorage.setItem("patients", JSON.stringify(updatedPatients));

            // Update the table
            setTableData(prev => ({
                ...prev,
                rows: prev.rows.filter(row => {
                    // Find if this row corresponds to the deleted patient
                    const index = prev.rows.indexOf(row);
                    const storedPatient = storedPatients[index];
                    return storedPatient && storedPatient.id !== id;
                })
            }));
        }
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