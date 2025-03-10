import React, { useState } from 'react';
import {
    Grid,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Fade
} from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Dummy data for consultations
const initialConsultations = [
    {
        id: '1',
        date: '2023-05-15',
        startTime: '09:00',
        endTime: '10:00',
        duration: '60',
        location: 'Main Clinic',
        icd10Codes: ['M54.5 - Low back pain', 'M25.5 - Joint pain'],
        cptCode1: '97112 - Neuromuscular reeducation',
        cptCode2: '97140 - Manual therapy',
        otName: 'Dr. Smith',
        otSignature: 'Smith, OT',
        shareSOAPNoteTo: 'Beneficiary',
        notes: 'Patient presented with initial symptoms.'
    },
    {
        id: '2',
        date: '2023-07-20',
        startTime: '14:00',
        endTime: '15:00',
        duration: '60',
        location: 'East Wing',
        icd10Codes: ['M54.5 - Low back pain'],
        cptCode1: '97110 - Therapeutic procedure',
        cptCode2: '97530 - Activities of daily living',
        otName: 'Dr. Johnson',
        otSignature: 'Johnson, OT',
        shareSOAPNoteTo: 'Other',
        notes: 'Reviewing progress and adjusting treatment plan.'
    }
];

// Dropdown data
const CPT_CODES_1 = [
    '97110 - Therapeutic procedure',
    '97112 - Neuromuscular reeducation',
    '97116 - Gait training'
];

const CPT_CODES_2 = [
    '97140 - Manual therapy',
    '97530 - Activities of daily living',
    '97535 - Self-care/home management training'
];

function Consultations({ patient }) {
    const [consultations, setConsultations] = useState(initialConsultations);
    const [openNewConsultation, setOpenNewConsultation] = useState(false);
    const [openEditConsultation, setOpenEditConsultation] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        color: "info"
    });
    const [currentConsultation, setCurrentConsultation] = useState({
        date: '',
        startTime: '',
        endTime: '',
        duration: '',
        location: '',
        icd10Codes: [],
        cptCode1: '',
        cptCode2: '',
        otName: '',
        otSignature: '',
        shareSOAPNoteTo: '',
        notes: ''
    });

    const handleOpenNewConsultation = () => {
        setCurrentConsultation({
            date: '',
            startTime: '',
            endTime: '',
            duration: '',
            location: '',
            icd10Codes: [],
            cptCode1: '',
            cptCode2: '',
            otName: '',
            otSignature: '',
            shareSOAPNoteTo: '',
            notes: ''
        });
        setOpenNewConsultation(true);
    };

    const handleCloseNewConsultation = () => {
        setOpenNewConsultation(false);
    };

    const handleSaveNewConsultation = () => {
        // Basic validation
        if (!currentConsultation.date || !currentConsultation.otName) {
            setAlertInfo({
                open: true,
                message: "Please fill in all required fields.",
                color: "warning"
            });
            setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
            return;
        }

        const newConsultationEntry = {
            ...currentConsultation,
            id: Date.now().toString(),
        };
        setConsultations([...consultations, newConsultationEntry]);
        handleCloseNewConsultation();

        // Success alert
        setAlertInfo({
            open: true,
            message: "Consultation added successfully!",
            color: "success"
        });
        setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
    };

    const handleOpenEditConsultation = (consultation) => {
        setCurrentConsultation({ ...consultation });
        setOpenEditConsultation(true);
    };

    const handleCloseEditConsultation = () => {
        setOpenEditConsultation(false);
    };

    const handleSaveEditConsultation = () => {
        // Basic validation
        if (!currentConsultation.date || !currentConsultation.otName) {
            setAlertInfo({
                open: true,
                message: "Please fill in all required fields.",
                color: "warning"
            });
            setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
            return;
        }

        const updatedConsultations = consultations.map(consultation =>
            consultation.id === currentConsultation.id ? currentConsultation : consultation
        );
        setConsultations(updatedConsultations);
        setSelectedConsultation(currentConsultation);
        handleCloseEditConsultation();

        // Success alert
        setAlertInfo({
            open: true,
            message: "Consultation updated successfully!",
            color: "success"
        });
        setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
    };

    const handleSelectConsultation = (consultation) => {
        setSelectedConsultation(consultation);
    };

    const handleICD10CodeChange = (event) => {
        const { value } = event.target;
        setCurrentConsultation(prev => ({
            ...prev,
            icd10Codes: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    return (
        <Grid item xs={12}>
            <MDBox position="relative">
                {/* Alert for feedback */}
                <Fade in={alertInfo.open}>
                    <MDBox position="absolute" top="1rem" right="1rem" zIndex={9999} width="100%" maxWidth="25rem">
                        <MDAlert color={alertInfo.color} dismissible>
                            {alertInfo.message}
                        </MDAlert>
                    </MDBox>
                </Fade>

                <Card>
                    <MDBox p={3}>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <MDTypography variant="h5" fontWeight="medium">
                                Consultations
                            </MDTypography>
                            <MDButton
                                variant="gradient"
                                color="warning"
                                sx={{ backgroundColor: "#f29f66" }}
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
                                                        backgroundColor: 'rgba(242, 159, 102, 0.1)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(242, 159, 102, 0.2)',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <MDTypography variant="body2" fontWeight="medium">
                                                            {consultation.date}
                                                        </MDTypography>
                                                    }
                                                    secondary={
                                                        <MDTypography variant="caption" color="text">
                                                            {consultation.otName} - {Array.isArray(consultation.icd10Codes) ? consultation.icd10Codes.join(', ') : consultation.icd10Codes}
                                                        </MDTypography>
                                                    }
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
                                                color="warning"
                                                size="small"
                                                sx={{ backgroundColor: "#f29f66" }}
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
                                                <strong>Start Time:</strong> {selectedConsultation.startTime}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>End Time:</strong> {selectedConsultation.endTime}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>Duration:</strong> {selectedConsultation.duration} minutes
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>ICD-10 Code(s):</strong> {Array.isArray(selectedConsultation.icd10Codes) ? selectedConsultation.icd10Codes.join(', ') : selectedConsultation.icd10Codes}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>CPT Code 1:</strong> {selectedConsultation.cptCode1}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>CPT Code 2:</strong> {selectedConsultation.cptCode2}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>OT Name:</strong> {selectedConsultation.otName}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>Location:</strong> {selectedConsultation.location}
                                            </MDTypography>
                                            <MDTypography variant="body2">
                                                <strong>Share SOAP Note:</strong> {selectedConsultation.shareSOAPNoteTo}
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
            </MDBox>

            {/* New Consultation Dialog */}
            <Dialog open={openNewConsultation} onClose={handleCloseNewConsultation} maxWidth="md" fullWidth>
                <DialogTitle>Add New Consultation</DialogTitle>
                <DialogContent>
                    <MDBox component="form" role="form" mt={2}>
                        <Grid container spacing={3}>
                            {/* Beneficiary - Prefilled */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Beneficiary"
                                    value={patient?.name || ""}
                                    disabled
                                />
                            </Grid>

                            {/* Date */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.date}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, date: e.target.value })}
                                />
                            </Grid>

                            {/* ICD-10 Codes */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="ICD-10 Code(s)"
                                    value={currentConsultation.icd10Codes}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, icd10Codes: e.target.value })}
                                />
                            </Grid>

                            {/* Time-related fields */}
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="Start Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.startTime}
                                    onChange={(e) => {
                                        const newStartTime = e.target.value;
                                        setCurrentConsultation(prev => {
                                            const duration = prev.endTime
                                                ? calculateDuration(newStartTime, prev.endTime)
                                                : prev.duration;
                                            return {
                                                ...prev,
                                                startTime: newStartTime,
                                                duration
                                            };
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="End Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.endTime}
                                    onChange={(e) => {
                                        const newEndTime = e.target.value;
                                        setCurrentConsultation(prev => {
                                            const duration = prev.startTime
                                                ? calculateDuration(prev.startTime, newEndTime)
                                                : prev.duration;
                                            return {
                                                ...prev,
                                                endTime: newEndTime,
                                                duration
                                            };
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="Duration (Min)"
                                    value={currentConsultation.duration}
                                    disabled
                                />
                            </Grid>

                            {/* CPT Codes */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="cpt-code-1">CPT Code 1</InputLabel>
                                    <Select
                                        value={currentConsultation.cptCode1}
                                        onChange={(e) => setCurrentConsultation({ ...currentConsultation, cptCode1: e.target.value })}
                                        label="CPT Code 1"
                                        inputProps={{
                                            name: 'cpt-code-1',
                                            id: 'cpt-code-1',
                                        }}
                                    >
                                        {CPT_CODES_1.map((code) => (
                                            <MenuItem key={code} value={code}>{code}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="cpt-code-2">CPT Code 2</InputLabel>
                                    <Select
                                        value={currentConsultation.cptCode2}
                                        onChange={(e) => setCurrentConsultation({ ...currentConsultation, cptCode2: e.target.value })}
                                        label="CPT Code 2"
                                        inputProps={{
                                            name: 'cpt-code-2',
                                            id: 'cpt-code-2',
                                        }}
                                    >
                                        {CPT_CODES_2.map((code) => (
                                            <MenuItem key={code} value={code}>{code}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* OT Name and Signature */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="OT Name"
                                    value={currentConsultation.otName}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, otName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="OT Signature"
                                    value={currentConsultation.otSignature}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, otSignature: e.target.value })}
                                />
                            </Grid>

                            {/* Share SOAP Note */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <MDTypography variant="body2" fontWeight="medium" mb={1}>
                                        Share SOAP Note
                                    </MDTypography>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentConsultation.shareSOAPNoteTo === 'Beneficiary'}
                                                    onChange={() => setCurrentConsultation({
                                                        ...currentConsultation,
                                                        shareSOAPNoteTo: currentConsultation.shareSOAPNoteTo === 'Beneficiary' ? '' : 'Beneficiary'
                                                    })}
                                                />
                                            }
                                            label="Beneficiary"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentConsultation.shareSOAPNoteTo === 'Other'}
                                                    onChange={() => setCurrentConsultation({
                                                        ...currentConsultation,
                                                        shareSOAPNoteTo: currentConsultation.shareSOAPNoteTo === 'Other' ? '' : 'Other'
                                                    })}
                                                />
                                            }
                                            label="Other"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* Location */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="Location"
                                    value={currentConsultation.location}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, location: e.target.value })}
                                />
                            </Grid>

                            {/* Notes */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={4}
                                    value={currentConsultation.notes}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, notes: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={handleCloseNewConsultation} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={handleSaveNewConsultation}
                        color="warning"
                        variant="gradient"
                        sx={{ backgroundColor: "#f29f66" }}
                    >
                        Save Consultation
                    </MDButton>
                </DialogActions>
            </Dialog>

            {/* Edit Consultation Dialog */}
            <Dialog open={openEditConsultation} onClose={handleCloseEditConsultation} maxWidth="md" fullWidth>
                <DialogTitle>Edit Consultation</DialogTitle>
                <DialogContent>
                    <MDBox component="form" role="form" mt={2}>
                        <Grid container spacing={3}>
                            {/* Beneficiary - Prefilled */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Beneficiary"
                                    value={patient?.name || ""}
                                    disabled
                                />
                            </Grid>

                            {/* Date */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.date}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, date: e.target.value })}
                                />
                            </Grid>

                            {/* ICD-10 Codes */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="ICD-10 Code(s)"
                                    value={currentConsultation.icd10Codes}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, icd10Codes: e.target.value })}
                                />
                            </Grid>

                            {/* Time-related fields */}
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="Start Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.startTime}
                                    onChange={(e) => {
                                        const newStartTime = e.target.value;
                                        setCurrentConsultation(prev => {
                                            const duration = prev.endTime
                                                ? calculateDuration(newStartTime, prev.endTime)
                                                : prev.duration;
                                            return {
                                                ...prev,
                                                startTime: newStartTime,
                                                duration
                                            };
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="End Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={currentConsultation.endTime}
                                    onChange={(e) => {
                                        const newEndTime = e.target.value;
                                        setCurrentConsultation(prev => {
                                            const duration = prev.startTime
                                                ? calculateDuration(prev.startTime, newEndTime)
                                                : prev.duration;
                                            return {
                                                ...prev,
                                                endTime: newEndTime,
                                                duration
                                            };
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MDInput
                                    fullWidth
                                    label="Duration (Min)"
                                    value={currentConsultation.duration}
                                    disabled
                                />
                            </Grid>

                            {/* CPT Codes */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="edit-cpt-code-1">CPT Code 1</InputLabel>
                                    <Select
                                        value={currentConsultation.cptCode1}
                                        onChange={(e) => setCurrentConsultation({ ...currentConsultation, cptCode1: e.target.value })}
                                        label="CPT Code 1"
                                        inputProps={{
                                            name: 'edit-cpt-code-1',
                                            id: 'edit-cpt-code-1',
                                        }}
                                    >
                                        {CPT_CODES_1.map((code) => (
                                            <MenuItem key={code} value={code}>{code}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="edit-cpt-code-2">CPT Code 2</InputLabel>
                                    <Select
                                        value={currentConsultation.cptCode2}
                                        onChange={(e) => setCurrentConsultation({ ...currentConsultation, cptCode2: e.target.value })}
                                        label="CPT Code 2"
                                        inputProps={{
                                            name: 'edit-cpt-code-2',
                                            id: 'edit-cpt-code-2',
                                        }}
                                    >
                                        {CPT_CODES_2.map((code) => (
                                            <MenuItem key={code} value={code}>{code}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* OT Name and Signature */}
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="OT Name"
                                    value={currentConsultation.otName}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, otName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDInput
                                    fullWidth
                                    label="OT Signature"
                                    value={currentConsultation.otSignature}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, otSignature: e.target.value })}
                                />
                            </Grid>

                            {/* Share SOAP Note */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <MDTypography variant="body2" fontWeight="medium" mb={1}>
                                        Share SOAP Note
                                    </MDTypography>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentConsultation.shareSOAPNoteTo === 'Beneficiary'}
                                                    onChange={() => setCurrentConsultation({
                                                        ...currentConsultation,
                                                        shareSOAPNoteTo: currentConsultation.shareSOAPNoteTo === 'Beneficiary' ? '' : 'Beneficiary'
                                                    })}
                                                />
                                            }
                                            label="Beneficiary"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentConsultation.shareSOAPNoteTo === 'Other'}
                                                    onChange={() => setCurrentConsultation({
                                                        ...currentConsultation,
                                                        shareSOAPNoteTo: currentConsultation.shareSOAPNoteTo === 'Other' ? '' : 'Other'
                                                    })}
                                                />
                                            }
                                            label="Other"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* Location */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="Location"
                                    value={currentConsultation.location}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, location: e.target.value })}
                                />
                            </Grid>

                            {/* Notes */}
                            <Grid item xs={12}>
                                <MDInput
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={4}
                                    value={currentConsultation.notes}
                                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, notes: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={handleCloseEditConsultation} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={handleSaveEditConsultation}
                        color="warning"
                        variant="gradient"
                        sx={{ backgroundColor: "#f29f66" }}
                    >
                        Save Changes
                    </MDButton>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

function calculateDuration(startTime, endTime) {
    // Split times into hours and minutes
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    // Calculate total minutes
    let durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

    // Handle cases crossing midnight
    if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
    }

    return durationMinutes.toString();
}

export default Consultations;