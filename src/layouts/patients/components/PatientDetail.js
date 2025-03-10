import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Grid,
    Stack,
    Button,
    Box,
    Avatar
} from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

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

    useEffect(() => {
        // Fetch patient from localStorage
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
                <MDBox display="flex" justifyContent="center" flexDirection="column" alignItems="center" height="100vh">
                    <MDTypography variant="h4" color="error" mb={3}>
                        Patient not found
                    </MDTypography>
                    <MDButton variant="gradient" color="info" onClick={() => navigate("/patients")}>
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
            <Box
                sx={{
                    position: 'relative',
                    height: '280px',
                    overflow: 'hidden',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: '4.75rem',
                    backgroundColor: 'white',
                    boxShadow: 1,
                    marginTop: -3,
                    marginX: 3,
                    padding: 2,
                    borderRadius: '16px'
                }}
            >
                <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                        <Avatar
                            src={defaultAvatar}
                            alt="profile"
                            sx={{ width: 80, height: 80 }}
                        />
                    </Grid>
                    <Grid item>
                        <Box>
                            <MDTypography variant="h4">{patient.name}</MDTypography>
                            <MDTypography variant="button" fontWeight="regular" color="text">
                                CEO / Patient
                            </MDTypography>
                        </Box>
                    </Grid>
                    <Grid item ml="auto">
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant={activeSection === "Basic Information" ? "contained" : "text"}
                                color="inherit"
                                sx={{
                                    color: 'white',
                                    ...(activeSection === "Basic Information" && {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                                        }
                                    })
                                }}
                                onClick={() => setActiveSection("Basic Information")}
                            >
                                Basic Information
                            </Button>
                            <Button
                                variant={activeSection === "Consultations" ? "contained" : "text"}
                                color="inherit"
                                sx={{
                                    color: 'white',
                                    ...(activeSection === "Consultations" && {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                                        }
                                    })
                                }}
                                onClick={() => setActiveSection("Consultations")}
                            >
                                Consultations
                            </Button>
                            <Button
                                variant={activeSection === "Documents" ? "contained" : "text"}
                                color="inherit"
                                sx={{
                                    color: 'white',
                                    ...(activeSection === "Documents" && {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                                        }
                                    })
                                }}
                                onClick={() => setActiveSection("Documents")}
                            >
                                Documents
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <MDBox mt={3} mb={3}>
                <Grid container justifyContent="center" spacing={3}>
                    {renderActiveSection()}
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default PatientDetail;