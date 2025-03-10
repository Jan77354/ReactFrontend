import React, { useState } from 'react';
import {
    Grid,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    LinearProgress
} from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Dummy data for consultations
const initialConsultations = [
    {
        id: '1',
        date: '2023-05-15',
        doctor: 'Dr. Smith',
        reason: 'Initial Consultation',
        notes: 'Patient presented with initial symptoms.',
        goals: [
            { name: 'Weight Management', progress: 60 },
            { name: 'Exercise Routine', progress: 40 },
            { name: 'Dietary Changes', progress: 75 }
        ]
    },
    {
        id: '2',
        date: '2023-07-20',
        doctor: 'Dr. Johnson',
        reason: 'Follow-up',
        notes: 'Reviewing progress and adjusting treatment plan.',
        goals: [
            { name: 'Weight Management', progress: 75 },
            { name: 'Exercise Routine', progress: 65 },
            { name: 'Dietary Changes', progress: 85 }
        ]
    }
];

function Consultations({ patient }) {
    const [consultations, setConsultations] = useState(initialConsultations);
    const [openNewConsultation, setOpenNewConsultation] = useState(false);
    const [openEditConsultation, setOpenEditConsultation] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [currentConsultation, setCurrentConsultation] = useState({
        date: '',
        doctor: '',
        reason: '',
        notes: '',
        goals: []
    });

    const handleOpenNewConsultation = () => {
        setCurrentConsultation({
            date: '',
            doctor: '',
            reason: '',
            notes: '',
            goals: [
                { name: 'Weight Management', progress: 0 },
                { name: 'Exercise Routine', progress: 0 },
                { name: 'Dietary Changes', progress: 0 }
            ]
        });
        setOpenNewConsultation(true);
    };

    const handleCloseNewConsultation = () => {
        setOpenNewConsultation(false);
    };

    const handleSaveNewConsultation = () => {
        const newConsultationEntry = {
            ...currentConsultation,
            id: Date.now().toString(),
        };
        setConsultations([...consultations, newConsultationEntry]);
        handleCloseNewConsultation();
    };

    const handleOpenEditConsultation = (consultation) => {
        setCurrentConsultation({...consultation});
        setOpenEditConsultation(true);
    };

    const handleCloseEditConsultation = () => {
        setOpenEditConsultation(false);
    };

    const handleSaveEditConsultation = () => {
        const updatedConsultations = consultations.map(consultation =>
            consultation.id === currentConsultation.id ? currentConsultation : consultation
        );
        setConsultations(updatedConsultations);
        setSelectedConsultation(currentConsultation);
        handleCloseEditConsultation();
    };

    const handleSelectConsultation = (consultation) => {
        setSelectedConsultation(consultation);
    };

    const handleGoalProgressChange = (index, value) => {
        const updatedGoals = [...currentConsultation.goals];
        updatedGoals[index].progress = value;
        setCurrentConsultation({...currentConsultation, goals: updatedGoals});
    };

    return (
        <Grid item xs={12}>
            <Card>
                <MDBox p={3}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <MDTypography variant="h5" fontWeight="medium">
                            Consultations
                        </MDTypography>
                        <MDButton
                            variant="gradient"
                            color="info"
                            onClick={handleOpenNewConsultation}
                        >
                            Add Consultation
                        </MDButton>
                    </MDBox>
                    <Divider />
                    <Grid container spacing={3} mt={1}>
                        <Grid item xs={12} md={5}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                Consultation History
                            </MDTypography>
                            <List>
                                {consultations.map((consultation) => (
                                    <React.Fragment key={consultation.id}>
                                        <ListItem
                                            button
                                            onClick={() => handleSelectConsultation(consultation)}
                                            selected={selectedConsultation?.id === consultation.id}
                                            sx={{
                                                '&.Mui-selected': {
                                                    backgroundColor: 'rgba(33, 150, 243, 0.1)', // Light blue background
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                                    },
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={consultation.date}
                                                secondary={`${consultation.doctor} - ${consultation.reason}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {selectedConsultation ? (
                                <MDBox>
                                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <MDTypography variant="h6" fontWeight="medium">
                                            Consultation Details
                                        </MDTypography>
                                        <MDButton
                                            variant="gradient"
                                            color="info"
                                            size="small"
                                            onClick={() => handleOpenEditConsultation(selectedConsultation)}
                                        >
                                            Edit
                                        </MDButton>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDTypography variant="body2">
                                            <strong>Date:</strong> {selectedConsultation.date}
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            <strong>Doctor:</strong> {selectedConsultation.doctor}
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            <strong>Reason:</strong> {selectedConsultation.reason}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                            Notes
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            {selectedConsultation.notes}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox>
                                        <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                            Patient Goals Progress
                                        </MDTypography>
                                        {selectedConsultation.goals.map((goal) => (
                                            <MDBox key={goal.name} mb={2}>
                                                <MDTypography variant="body2" mb={1}>
                                                    {goal.name}
                                                </MDTypography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={goal.progress}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: '#2196f3' // Blue color
                                                        }
                                                    }}
                                                />
                                            </MDBox>
                                        ))}
                                    </MDBox>
                                </MDBox>
                            ) : (
                                <MDTypography variant="body2" align="center">
                                    Select a consultation to view details
                                </MDTypography>
                            )}
                        </Grid>
                    </Grid>
                </MDBox>
            </Card>

            {/* New Consultation Dialog */}
            <Dialog open={openNewConsultation} onClose={handleCloseNewConsultation} maxWidth="md" fullWidth>
                <DialogTitle>Add New Consultation</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={currentConsultation.date}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, date: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Doctor"
                                value={currentConsultation.doctor}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, doctor: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Reason for Consultation"
                                value={currentConsultation.reason}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, reason: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                multiline
                                rows={4}
                                value={currentConsultation.notes}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, notes: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                Patient Goals Progress
                            </MDTypography>
                            {currentConsultation.goals.map((goal, index) => (
                                <MDBox key={goal.name} mb={2}>
                                    <MDTypography variant="body2" mb={1}>
                                        {goal.name}
                                    </MDTypography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={goal.progress}
                                        onChange={(e, value) => handleGoalProgressChange(index, value)}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#2196f3' // Blue color
                                            }
                                        }}
                                    />
                                </MDBox>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewConsultation} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNewConsultation} color="primary" variant="contained">
                        Save Consultation
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Consultation Dialog */}
            <Dialog open={openEditConsultation} onClose={handleCloseEditConsultation} maxWidth="md" fullWidth>
                <DialogTitle>Edit Consultation</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={currentConsultation.date}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, date: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Doctor"
                                value={currentConsultation.doctor}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, doctor: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Reason for Consultation"
                                value={currentConsultation.reason}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, reason: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                multiline
                                rows={4}
                                value={currentConsultation.notes}
                                onChange={(e) => setCurrentConsultation({...currentConsultation, notes: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                Patient Goals Progress
                            </MDTypography>
                            {currentConsultation.goals.map((goal, index) => (
                                <MDBox key={goal.name} mb={2}>
                                    <MDTypography variant="body2" mb={1}>
                                        {goal.name}
                                    </MDTypography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={goal.progress}
                                        onChange={(e, value) => handleGoalProgressChange(index, value)}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#2196f3' // Blue color
                                            }
                                        }}
                                    />
                                </MDBox>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditConsultation} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEditConsultation} color="primary" variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Consultations;