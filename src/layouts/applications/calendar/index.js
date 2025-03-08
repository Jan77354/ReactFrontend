import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Calendar components
import NextEvents from "layouts/applications/calendar/components/NextEvents";

// Data
import calendarEventsData from "layouts/applications/calendar/data/calendarEventsData";

function Calendar() {
    const [events, setEvents] = useState(calendarEventsData);
    const [selectedDate, setSelectedDate] = useState(new Date(2021, 7, 1)); // August 2021
    const [openEventModal, setOpenEventModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: "",
        end: "",
        className: "primary"
    });

    // Handle adding a new event
    const handleAddEvent = () => {
        if (newEvent.title && newEvent.start) {
            setEvents([...events, newEvent]);
            setOpenEventModal(false);
            // Reset new event form
            setNewEvent({
                title: "",
                start: "",
                end: "",
                className: "primary"
            });
        }
    };

    // Handle Google Calendar integration
    const handleGoogleCalendarSync = () => {
        // This is a placeholder. Actual implementation requires OAuth and Google Calendar API
        alert("Google Calendar sync will be implemented soon. This requires setting up Google OAuth.");
    };

    // Event modal
    const renderEventModal = () => (
        <Dialog
            open={openEventModal}
            onClose={() => setOpenEventModal(false)}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                <MDTypography variant="h5">Add New Event</MDTypography>
            </DialogTitle>
            <DialogContent>
                <MDBox component="form" role="form">
                    <MDBox mb={2}>
                        <MDInput
                            type="text"
                            label="Event Title"
                            fullWidth
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput
                            type="date"
                            label="Start Date"
                            fullWidth
                            value={newEvent.start}
                            onChange={(e) => setNewEvent({...newEvent, start: e.target.value, end: e.target.value})}
                        />
                    </MDBox>
                    <MDBox mb={2}>
                        <MDTypography variant="caption">Event Color</MDTypography>
                        <MDBox display="flex" justifyContent="space-between">
                            {["primary", "secondary", "success", "error", "warning", "info"].map((color) => (
                                <MDButton
                                    key={color}
                                    color={color}
                                    variant={newEvent.className === color ? "contained" : "outlined"}
                                    onClick={() => setNewEvent({...newEvent, className: color})}
                                    size="small"
                                >
                                    {color}
                                </MDButton>
                            ))}
                        </MDBox>
                    </MDBox>
                </MDBox>
            </DialogContent>
            <DialogActions>
                <MDButton
                    color="secondary"
                    onClick={() => setOpenEventModal(false)}
                >
                    Cancel
                </MDButton>
                <MDButton
                    color="primary"
                    onClick={handleAddEvent}
                >
                    Add Event
                </MDButton>
            </DialogActions>
        </Dialog>
    );

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <MDTypography variant="h4">Calendar</MDTypography>
                    <MDBox>
                        <MDButton
                            color="info"
                            variant="gradient"
                            onClick={() => setOpenEventModal(true)}
                            sx={{ mr: 2 }}
                        >
                            Add New Event
                        </MDButton>
                        <MDButton
                            color="primary"
                            variant="outlined"
                            onClick={handleGoogleCalendarSync}
                        >
                            Sync Google Calendar
                        </MDButton>
                    </MDBox>
                </MDBox>
                <Grid container spacing={3}>
                    <Grid item xs={12} xl={9}>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            initialDate={selectedDate}
                            events={events}
                            editable={true}
                            selectable={true}
                            eventClassNames={(arg) => {
                                return [arg.event.extendedProps.className || ''];
                            }}
                            headerToolbar={{
                                left: 'title',
                                center: '',
                                right: 'prev,next today'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} xl={3}>
                        <NextEvents events={events} />
                    </Grid>
                </Grid>
            </MDBox>

            {/* Event Creation Modal */}
            {renderEventModal()}

            <Footer />
        </DashboardLayout>
    );
}

export default Calendar;