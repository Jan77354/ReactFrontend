import React from 'react';
import {
    Grid,
    Card,
    Divider
} from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function BasicInformation({ patient, onEdit }) {
    return (
        <Grid item xs={12}>
            <Card>
                <MDBox p={3}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <MDTypography variant="h5" fontWeight="medium">
                            Basic Information
                        </MDTypography>
                        <MDButton
                            variant="gradient"
                            color="info"
                            size="small"
                            onClick={onEdit}
                        >
                            Edit
                        </MDButton>
                    </MDBox>
                    <Divider />
                    <MDBox mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <MDTypography variant="h6" color="text" mb={1}>
                                    First Name
                                </MDTypography>
                                <MDTypography variant="body2">
                                    {patient.firstName || "N/A"}
                                </MDTypography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDTypography variant="h6" color="text" mb={1}>
                                    Last Name
                                </MDTypography>
                                <MDTypography variant="body2">
                                    {patient.lastName || "N/A"}
                                </MDTypography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDTypography variant="h6" color="text" mb={1}>
                                    Email
                                </MDTypography>
                                <MDTypography variant="body2">
                                    {patient.email || "N/A"}
                                </MDTypography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDTypography variant="h6" color="text" mb={1}>
                                    Phone
                                </MDTypography>
                                <MDTypography variant="body2">
                                    {patient.phone || "N/A"}
                                </MDTypography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDTypography variant="h6" color="text" mb={1}>
                                    Date of Birth
                                </MDTypography>
                                <MDTypography variant="body2">
                                    {patient.dateOfBirth || "N/A"}
                                </MDTypography>
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
            </Card>
        </Grid>
    );
}

export default BasicInformation;