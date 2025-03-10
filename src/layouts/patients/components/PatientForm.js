import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";

function PatientForm({ open, onClose, onSubmit, initialData = {} }) {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        dateOfBirth: initialData.dateOfBirth || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name) {
            alert("Name is required");
            return;
        }

        onSubmit(formData);

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            dateOfBirth: ""
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <MDTypography variant="h5" fontWeight="medium">
                    {initialData.id ? "Edit Patient" : "Add New Patient"}
                </MDTypography>
            </DialogTitle>
            <DialogContent>
                <MDBox component="form" role="form" mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <MDInput
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDInput
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDInput
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDInput
                                fullWidth
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </MDBox>
            </DialogContent>
            <DialogActions>
                <MDButton onClick={onClose} color="secondary">
                    Cancel
                </MDButton>
                <MDButton
                    onClick={handleSubmit}
                    color="warning"
                    variant="gradient"
                    sx={{ backgroundColor: "#f29f66" }}
                >
                    <Icon sx={{ mr: 1 }}>save</Icon>
                    {initialData.id ? "Save Changes" : "Add Patient"}
                </MDButton>
            </DialogActions>
        </Dialog>
    );
}

export default PatientForm;