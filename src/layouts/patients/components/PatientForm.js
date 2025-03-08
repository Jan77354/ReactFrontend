import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import PatientService from "services/patient-service";

function PatientForm() {
    const navigate = useNavigate();
    const { id, action } = useParams();
    const isView = action === "view";
    const isEdit = action === "edit" || isView;
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: null,
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        medicalHistory: "",
        lastVisit: null,
        nextAppointment: null,
    });

    useEffect(() => {
        if (isEdit && id) {
            fetchPatient();
        }
    }, [isEdit, id]);

    const fetchPatient = async () => {
        try {
            setLoading(true);
            const patient = await PatientService.getPatientById(id);
            setFormData({
                ...patient,
                dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth) : null,
                lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
                nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment) : null,
                address: patient.address || {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                },
            });
            setError(null);
        } catch (err) {
            console.error("Error fetching patient:", err);
            setError("Failed to load patient data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEdit) {
                await PatientService.updatePatient(id, formData);
            } else {
                await PatientService.createPatient(formData);
            }
            navigate("/patients");
        } catch (err) {
            console.error("Error saving patient:", err);
            setError("Failed to save patient. Please try again.");
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <MDTypography>Loading patient data...</MDTypography>;
    }

    if (error) {
        return (
            <MDBox p={2}>
                <MDTypography color="error">{error}</MDTypography>
                <MDButton onClick={isEdit ? fetchPatient : () => {}} variant="outlined" size="small" color="info" sx={{ mt: 1 }}>
                    Retry
                </MDButton>
            </MDBox>
        );
    }

    return (
        <Card>
            <MDBox p={3}>
                <MDTypography variant="h6" mb={2}>
                    {isView ? "Patient Details" : isEdit ? "Edit Patient" : "Add New Patient"}
                </MDTypography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={isView}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={isView}
                                required
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
                                disabled={isView}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.dateOfBirth}
                                    onChange={(date) => handleDateChange("dateOfBirth", date)}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth disabled={isView} />
                                    )}
                                    disabled={isView}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <MDTypography variant="subtitle2">Address</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="City"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="State/Province"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Zip/Postal Code"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Medical History"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Last Visit"
                                    value={formData.lastVisit}
                                    onChange={(date) => handleDateChange("lastVisit", date)}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth disabled={isView} />
                                    )}
                                    disabled={isView}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Next Appointment"
                                    value={formData.nextAppointment}
                                    onChange={(date) => handleDateChange("nextAppointment", date)}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth disabled={isView} />
                                    )}
                                    disabled={isView}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <MDBox display="flex" justifyContent="flex-end" mt={2}>
                                <MDButton
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate("/patients")}
                                    sx={{ mr: 1 }}
                                >
                                    {isView ? "Back" : "Cancel"}
                                </MDButton>
                                {!isView && (
                                    <MDButton type="submit" variant="gradient" color="info">
                                        {isEdit ? "Update Patient" : "Create Patient"}
                                    </MDButton>
                                )}
                                {isView && (
                                    <MDButton
                                        variant="gradient"
                                        color="warning"
                                        onClick={() => navigate(`/patients/${id}/edit`)}
                                    >
                                        Edit
                                    </MDButton>
                                )}
                            </MDBox>
                        </Grid>
                    </Grid>
                </form>
            </MDBox>
        </Card>
    );
}

export default PatientForm;