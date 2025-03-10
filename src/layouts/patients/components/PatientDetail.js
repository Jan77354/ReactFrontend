import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Grid,
    Card,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fade
} from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import BasicInformation from "./BasicInformation";
import Consultations from "./Consultations";
import Documents from "./Documents";

// Images
import defaultAvatar from "assets/images/team-3.jpg";
import backgroundImage from "assets/images/DSC02290-01-scaled.webp";

function PatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("Basic Information");
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: ""
    });
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        color: "info"
    });

    useEffect(() => {
        loadPatientData();
    }, [id]);

    const loadPatientData = () => {
        // Fetch patient from localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const foundPatient = storedPatients.find(p => p.id === id);

        if (foundPatient) {
            setPatient(foundPatient);
            // Initialize edit form with patient data
            setEditForm({
                name: foundPatient.name || "",
                email: foundPatient.email || "",
                phone: foundPatient.phone || "",
                dateOfBirth: foundPatient.dateOfBirth || ""
            });
        }
        setLoading(false);
    };

    const handleEdit = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        // In a real application, you would update the patient in your API
        // For now, we'll simulate updating in localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const updatedPatients = storedPatients.map(p =>
            p.id === id ? { ...p, ...editForm } : p
        );
        localStorage.setItem("patients", JSON.stringify(updatedPatients));

        // Update local state
        setPatient(prev => ({ ...prev, ...editForm }));

        // Close dialog
        setOpenEditDialog(false);

        // Show success message
        setAlertInfo({
            open: true,
            message: "Patient information updated successfully",
            color: "success"
        });
        setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
    };

    const handleBackToPatients = () => {
        navigate("/patients");
    };

    const renderActiveSection = () => {
        if (!patient) return null;

        switch (activeSection) {
            case "Basic Information":
                return <BasicInformation patient={patient} onEdit={handleEdit} />;
            case "Consultations":
                return <Consultations patient={patient} />;
            case "Documents":
                return <Documents patient={patient} />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <MDTypography variant="h5" fontWeight="medium">Loading patient details...</MDTypography>
                </MDBox>
                <Footer />
            </DashboardLayout>
        );
    }

    if (!patient) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                    <MDBox width="100%" maxWidth="450px" p={3}>
                        <MDAlert color="error" dismissible>
                            <MDTypography variant="h6" fontWeight="medium" color="white">
                                Patient Not Found
                            </MDTypography>
                            <MDTypography variant="body2" color="white">
                                The patient you are looking for does not exist or has been removed.
                            </MDTypography>
                        </MDAlert>
                        <MDBox mt={3} display="flex" justifyContent="center">
                            <MDButton
                                variant="gradient"
                                color="warning"
                                onClick={handleBackToPatients}
                                sx={{ backgroundColor: "#f29f66" }}
                            >
                                <Icon sx={{ mr: 1 }}>arrow_back</Icon>
                                Back to Patients
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
                <Footer />
            </DashboardLayout>
        );
    }

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

            {/* Cover Image */}
            <MDBox
                position="relative"
                height="200px"
                borderRadius="xl"
                mx={2}
                mt={2} // Increased to push it below the navbar
                mb={2}
                sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px 0 rgba(0,0,0,0.1)'
                }}
            />

            {/* Profile Card */}
            <Card
                sx={{
                    position: 'relative',
                    mt: -6,
                    mx: 3,
                    py: 2,
                    px: 4,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                }}
            >
                <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                        <MDAvatar
                            src={defaultAvatar}
                            alt={patient.name || ""}
                            size="xl"
                            shadow="xl"
                            sx={{
                                border: '3px solid white',
                                mt: -2,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MDBox>
                            <MDTypography variant="h4" fontWeight="bold">{patient.name}</MDTypography>
                            <MDTypography variant="button" fontWeight="regular" color="text">
                                Patient ID: {patient.id}
                            </MDTypography>
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={true} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <MDBox display="flex" gap={1} flexDirection={{ xs: 'column', md: 'row' }}>
                            <MDButton
                                variant={activeSection === "Basic Information" ? "gradient" : "outlined"}
                                color="warning"
                                sx={{
                                    ...(activeSection === "Basic Information" && {
                                        backgroundColor: "#f29f66"
                                    })
                                }}
                                onClick={() => setActiveSection("Basic Information")}
                            >
                                Basic Information
                            </MDButton>
                            <MDButton
                                variant={activeSection === "Consultations" ? "gradient" : "outlined"}
                                color="warning"
                                sx={{
                                    ...(activeSection === "Consultations" && {
                                        backgroundColor: "#f29f66"
                                    })
                                }}
                                onClick={() => setActiveSection("Consultations")}
                            >
                                Consultations
                            </MDButton>
                            <MDButton
                                variant={activeSection === "Documents" ? "gradient" : "outlined"}
                                color="warning"
                                sx={{
                                    ...(activeSection === "Documents" && {
                                        backgroundColor: "#f29f66"
                                    })
                                }}
                                onClick={() => setActiveSection("Documents")}
                            >
                                Documents
                            </MDButton>
                        </MDBox>
                    </Grid>
                </Grid>
            </Card>

            {/* Content Section */}
            <MDBox mt={4} mb={6} mx={3}>
                {renderActiveSection()}
            </MDBox>

            {/* Edit Patient Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
                <DialogTitle>Edit Patient Information</DialogTitle>
                <DialogContent>
                    <MDBox component="form" role="form" mt={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditFormChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={editForm.email}
                                    onChange={handleEditFormChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleEditFormChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={editForm.dateOfBirth}
                                    onChange={handleEditFormChange}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={handleCloseEditDialog} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={handleSaveEdit}
                        color="warning"
                        variant="gradient"
                        sx={{ backgroundColor: "#f29f66" }}
                    >
                        Save Changes
                    </MDButton>
                </DialogActions>
            </Dialog>

            <Footer />
        </DashboardLayout>
    );
}

export default PatientDetail;