import React from 'react';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

function Notifications() {
    // Placeholder for notifications data
    const notifications = [
        // Example notification structure
        // { id: 1, type: 'patient', message: 'New patient record created', timestamp: new Date() },
        // { id: 2, type: 'message', message: 'Unread message from Dr. Smith', timestamp: new Date() }
    ];

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <MDTypography variant="h4" fontWeight="medium">
                        Notifications
                    </MDTypography>
                    <MDBox mt={3}>
                        {notifications.length === 0 ? (
                            <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                                <MDTypography variant="body2" color="text">
                                    No recent notifications
                                </MDTypography>
                            </MDBox>
                        ) : (
                            // Placeholder for notifications list
                            <MDBox>
                                {notifications.map((notification) => (
                                    <MDBox key={notification.id} mb={2}>
                                        <MDTypography variant="body2">
                                            {notification.message}
                                        </MDTypography>
                                    </MDBox>
                                ))}
                            </MDBox>
                        )}

                        {/* Example of a clear notifications button */}
                        <MDBox display="flex" justifyContent="center" mt={3}>
                            <MDButton variant="gradient" color="warning">
                                Clear Notifications
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Notifications;