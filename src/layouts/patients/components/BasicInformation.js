import React from 'react';
import {
    Grid,
    Card,
    Divider,
    Icon
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
                            color="warning"
                            size="small"
                            onClick={onEdit}
                            sx={{ backgroundColor: "#f29f66" }}
                        >
                            <Icon sx={{ mr: 1 }}>edit</Icon>
                            Edit
                        </MDButton>
                    </MDBox>
                    <Divider />
                    <MDBox mt={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <MDBox
                                    p={2}
                                    borderRadius="lg"
                                    bgColor="grey.100"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                                        Name
                                    </MDTypography>
                                    <MDTypography variant="body1" fontWeight="regular">
                                        {patient.name || "N/A"}
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDBox
                                    p={2}
                                    borderRadius="lg"
                                    bgColor="grey.100"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                                        Email
                                    </MDTypography>
                                    <MDTypography variant="body1" fontWeight="regular">
                                        {patient.email || "N/A"}
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDBox
                                    p={2}
                                    borderRadius="lg"
                                    bgColor="grey.100"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                                        Phone
                                    </MDTypography>
                                    <MDTypography variant="body1" fontWeight="regular">
                                        {patient.phone || "N/A"}
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDBox
                                    p={2}
                                    borderRadius="lg"
                                    bgColor="grey.100"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                                        Date of Birth
                                    </MDTypography>
                                    <MDTypography variant="body1" fontWeight="regular">
                                        {patient.dateOfBirth || "N/A"}
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
            </Card>
        </Grid>
    );
}

export default BasicInformation;