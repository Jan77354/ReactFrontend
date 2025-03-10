import React from 'react';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

function Emails() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <MDTypography variant="h4" fontWeight="medium">
                        Emails
                    </MDTypography>
                    <MDBox mt={3}>
                        {/* Placeholder for email integration */}
                        <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                            <MDTypography variant="body2" color="text">
                                Connect your Gmail account to view emails
                            </MDTypography>
                        </MDBox>

                        {/* Example of a Gmail connect button */}
                        <MDBox display="flex" justifyContent="center" mt={3}>
                            <MDButton variant="gradient" color="primary">
                                Connect Gmail
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Emails;