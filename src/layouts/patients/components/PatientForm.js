import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function PatientForm({ open, onClose, onSubmit, initialData = null }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: ""
    });

    // If initialData is provided, populate the form (for editing)
    useEffect(() => {
        if (initialData) {
            const nameParts = initialData.name.split(" ");
            setFormData({
                firstName: nameParts[0] || "",
                lastName: nameParts.slice(1).join(" ") || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                dateOfBirth: initialData.dateOfBirth || ""
            });
        } else {
            // Reset form when adding a new patient
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dateOfBirth: ""
            });
        }
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit({
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`.trim()
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <MDTypography variant="h6" fontWeight="medium">
                    {initialData ? "Edit Patient" : "Add New Patient"}
                </MDTypography>
            </DialogTitle>
            <DialogContent>
                <MDBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
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
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </MDBox>
            </DialogContent>
            <DialogActions>
                <MDButton color="secondary" onClick={onClose}>
                    Cancel
                </MDButton>
                <MDButton color="info" onClick={handleSubmit}>
                    {initialData ? "Update Patient" : "Add Patient"}
                </MDButton>
            </DialogActions>
        </Dialog>
    );
}

export default PatientForm;