import { useState, useEffect } from "react";
import { Card, Fade } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
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
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        color: "info"
    });
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
        loadPatientData();
    }, []);

    const loadPatientData = () => {
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
                        onClick={() => handleViewPatient(patient.id)}
                        sx={{
                            color: "#f29f66" // Custom color to match our scheme
                        }}
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
    };

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

        // Reload patient data
        loadPatientData();

        // Close dialog
        handleCloseDialog();

        // Show success alert
        setAlertInfo({
            open: true,
            message: "Patient added successfully",
            color: "success"
        });
        setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
    };

    const handleViewPatient = (id) => {
        navigate(`/patients/${id}/view`);
    };

    const handleDeletePatient = (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            // Remove from localStorage
            const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
            const updatedPatients = storedPatients.filter(p => p.id !== id);
            localStorage.setItem("patients", JSON.stringify(updatedPatients));

            // Reload the data
            loadPatientData();

            // Show alert
            setAlertInfo({
                open: true,
                message: "Patient deleted successfully",
                color: "error"
            });
            setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />

            {/* Feedback Alert */}
            <Fade in={alertInfo.open}>
                <MDBox position="absolute" top="4rem" right="1rem" zIndex={9999} width="100%" maxWidth="25rem">
                    <MDAlert color={alertInfo.color} dismissible>
                        {alertInfo.message}
                    </MDAlert>
                </MDBox>
            </Fade>

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
                        color="warning"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAddPatient}
                        sx={{ backgroundColor: "#f29f66" }}
                    >
                        Add New Patient
                    </MDButton>
                </MDBox>
                <Card sx={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)' }}>
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