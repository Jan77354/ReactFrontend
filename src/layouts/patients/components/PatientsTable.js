import { useState, useEffect } from "react";
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import PatientService from "services/patient-service";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function PatientsTable() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            setLoading(true);
            const data = await PatientService.getAllPatients();
            setPatients(data);
            setError(null);
        } catch (err) {
            console.error("Error loading patients:", err);
            setError("Failed to load patients. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const deletePatient = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await PatientService.deletePatient(id);
                loadPatients();
            } catch (err) {
                console.error("Error deleting patient:", err);
                setError("Failed to delete patient. Please try again.");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch (e) {
            return "Invalid Date";
        }
    };

    if (loading) {
        return <MDTypography>Loading patients...</MDTypography>;
    }

    if (error) {
        return (
            <MDBox p={2}>
                <MDTypography color="error">{error}</MDTypography>
                <MDButton onClick={loadPatients} variant="outlined" size="small" color="info" sx={{ mt: 1 }}>
                    Retry
                </MDButton>
            </MDBox>
        );
    }

    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6">Patients List</MDTypography>
                <MDButton
                    component={Link}
                    to="/patients/new"
                    variant="gradient"
                    color="info"
                    startIcon={<Icon>add</Icon>}
                >
                    Add New Patient
                </MDButton>
            </MDBox>
            <MDBox p={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Last Visit</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <MDTypography align="center">No patients found</MDTypography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                patients.map((patient) => (
                                    <TableRow key={patient._id}>
                                        <TableCell>
                                            <MDTypography variant="body2">
                                                {patient.firstName} {patient.lastName}
                                            </MDTypography>
                                        </TableCell>
                                        <TableCell>
                                            <MDTypography variant="body2">{patient.email}</MDTypography>
                                        </TableCell>
                                        <TableCell>
                                            <MDTypography variant="body2">{patient.phone || "N/A"}</MDTypography>
                                        </TableCell>
                                        <TableCell>
                                            <MDTypography variant="body2">
                                                {formatDate(patient.dateOfBirth)}
                                            </MDTypography>
                                        </TableCell>
                                        <TableCell>
                                            <MDTypography variant="body2">
                                                {formatDate(patient.lastVisit)}
                                            </MDTypography>
                                        </TableCell>
                                        <TableCell>
                                            <MDBox display="flex" gap={1}>
                                                <Tooltip title="View">
                                                    <IconButton
                                                        component={Link}
                                                        to={`/patients/${patient._id}/view`}
                                                        size="small"
                                                        color="info"
                                                    >
                                                        <Icon>visibility</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        component={Link}
                                                        to={`/patients/${patient._id}/edit`}
                                                        size="small"
                                                        color="warning"
                                                    >
                                                        <Icon>edit</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => deletePatient(patient._id)}
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </MDBox>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MDBox>
        </Card>
    );
}

export default PatientsTable;