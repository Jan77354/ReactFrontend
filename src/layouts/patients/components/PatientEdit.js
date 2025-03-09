import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    Grid,
    TextField,
    Divider
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PatientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real application, you would fetch the patient from your API
        // For now, we'll simulate fetching from localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const foundPatient = storedPatients.find(p => p.id === id);

        if (foundPatient) {
            setFormData({
                name: foundPatient.name,
                email: foundPatient.email,
                phone: foundPatient.phone,
                dateOfBirth: foundPatient.dateOfBirth
            });
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // In a real application, you would update the patient in your API
        // For now, we'll simulate updating in localStorage
        const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const updatedPatients = storedPatients.map(p =>
            p.id === id ? { ...p, ...formData } : p
        );
        localStorage.setItem("patients", JSON.stringify(updatedPatients));

        // Navigate back to patient detail view
        navigate(`/patients/${id}/view`);
    };

    const handleCancel = () => {
        navigate(`/patients/${id}/view`);
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

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox p={3}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Edit Patient
                                </MDTypography>
                                <Divider />
                                <MDBox component="form" mt={3}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Date of Birth"
                                                name="dateOfBirth"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        {/* Add more fields as needed */}
                                        <Grid item xs={12}>
                                            <MDBox display="flex" justifyContent="flex-end" mt={3}>
                                                <MDButton variant="outlined" color="secondary" onClick={handleCancel} sx={{ mr: 1 }}>
                                                    Cancel
                                                </MDButton>
                                                <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                                                    Save Changes
                                                </MDButton>
                                            </MDBox>
                                        </Grid>
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

export default PatientEdit;