import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    Grid,
    Divider,
    Icon
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isViewMode] = useState(window.location.pathname.includes("/view"));

    useEffect(() => {
        // In a real application, you would fetch the patient from your API
        // For now, we'll simulate fetching from localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const foundPatient = storedPatients.find(p => p.id === id);

        if (foundPatient) {
            setPatient(foundPatient);
        }
        setLoading(false);
    }, [id]);

    const handleEdit = () => {
        navigate(`/patients/${id}/edit`);
    };

    const handleBack = () => {
        navigate("/patients");
    };

    if (loading) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox display="flex" justifyContent="center">
                    <MDTypography>Loading patient details...</MDTypography>
                </MDBox>
                <Footer />
            </DashboardLayout>
        );
    }

    if (!patient) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <MDTypography variant="h4" color="error" mb={3}>
                        Patient not found
                    </MDTypography>
                    <MDButton variant="gradient" color="info" onClick={handleBack}>
                        Back to Patients
                    </MDButton>
                </MDBox>
                <Footer />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox p={3}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                    <MDTypography variant="h5" fontWeight="medium">
                                        {isViewMode ? "Patient Information" : "Edit Patient"}
                                    </MDTypography>
                                    <MDBox>
                                        {isViewMode ? (
                                            <MDButton variant="gradient" color="info" onClick={handleEdit}>
                                                <Icon>edit</Icon>&nbsp;Edit
                                            </MDButton>
                                        ) : null}
                                        <MDButton variant="outlined" color="secondary" onClick={handleBack} sx={{ ml: 1 }}>
                                            Back
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                                <Divider />
                                <MDBox mt={3}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <MDTypography variant="h6" color="text">
                                                Full Name
                                            </MDTypography>
                                            <MDTypography variant="body2">{patient.name}</MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDTypography variant="h6" color="text">
                                                Email
                                            </MDTypography>
                                            <MDTypography variant="body2">{patient.email}</MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDTypography variant="h6" color="text">
                                                Phone
                                            </MDTypography>
                                            <MDTypography variant="body2">{patient.phone}</MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDTypography variant="h6" color="text">
                                                Date of Birth
                                            </MDTypography>
                                            <MDTypography variant="body2">{patient.dateOfBirth}</MDTypography>
                                        </Grid>
                                        {/* Add more fields as needed */}
                                    </Grid>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default PatientDetail;