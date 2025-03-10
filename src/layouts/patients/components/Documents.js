import React, { useState, useRef } from 'react';
import {
    Grid,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Fade
} from '@mui/material';
import {
    DescriptionOutlined as DocumentIcon,
    CloudUpload as UploadIcon,
    VisibilityOutlined as PreviewIcon,
    DeleteOutline as DeleteIcon
} from '@mui/icons-material';
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";

// Dummy initial documents
const initialDocuments = [
    {
        id: '1',
        name: 'Medical History',
        type: 'PDF',
        uploadDate: '2023-05-15',
        size: '2.5 MB',
        url: '/path/to/medical-history.pdf'
    },
    {
        id: '2',
        name: 'Lab Results',
        type: 'PDF',
        uploadDate: '2023-07-20',
        size: '1.8 MB',
        url: '/path/to/lab-results.pdf'
    }
];

function Documents({ patient }) {
    const [documents, setDocuments] = useState(initialDocuments);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [newDocument, setNewDocument] = useState({
        name: '',
        file: null
    });
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        color: "info"
    });
    const fileInputRef = useRef(null);

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
        setNewDocument({ name: '', file: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewDocument(prev => ({
                ...prev,
                file: file,
                name: file.name,
                type: file.type.split('/').pop().toUpperCase(),
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                uploadDate: new Date().toISOString().split('T')[0],
                url: URL.createObjectURL(file)
            }));
        }
    };

    const handleUploadDocument = () => {
        if (newDocument.file) {
            const documentToAdd = {
                ...newDocument,
                id: Date.now().toString()
            };
            setDocuments([...documents, documentToAdd]);
            handleCloseUploadDialog();

            // Show success alert
            setAlertInfo({
                open: true,
                message: "Document uploaded successfully",
                color: "success"
            });
            setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
        }
    };

    const handleSelectDocument = (document) => {
        setSelectedDocument(document);
    };

    const handleDeleteDocument = (documentToDelete) => {
        if (window.confirm(`Are you sure you want to delete ${documentToDelete.name}?`)) {
            const updatedDocuments = documents.filter(doc => doc.id !== documentToDelete.id);
            setDocuments(updatedDocuments);

            if (selectedDocument?.id === documentToDelete.id) {
                setSelectedDocument(null);
            }

            // Show alert
            setAlertInfo({
                open: true,
                message: "Document deleted successfully",
                color: "error"
            });
            setTimeout(() => setAlertInfo({ ...alertInfo, open: false }), 3000);
        }
    };

    const handlePreviewDocument = (document) => {
        // In a real application, this would open the document in a viewer or download it
        window.open(document.url, '_blank');
    };

    return (
        <Grid item xs={12} position="relative">
            {/* Feedback Alert */}
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
                            Documents
                        </MDTypography>
                        <MDButton
                            variant="gradient"
                            color="warning"
                            onClick={handleOpenUploadDialog}
                            sx={{ backgroundColor: "#f29f66" }}
                        >
                            <Icon sx={{ mr: 1 }}>upload</Icon>
                            Upload Document
                        </MDButton>
                    </MDBox>
                    <Divider />
                    <Grid container spacing={3} mt={1}>
                        <Grid item xs={12} md={5}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>
                                Document History
                            </MDTypography>
                            <List>
                                {documents.map((document) => (
                                    <React.Fragment key={document.id}>
                                        <ListItem
                                            button
                                            onClick={() => handleSelectDocument(document)}
                                            selected={selectedDocument?.id === document.id}
                                            sx={{
                                                '&.Mui-selected': {
                                                    backgroundColor: 'rgba(242, 159, 102, 0.1)', // Light orange/yellow background
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(242, 159, 102, 0.2)',
                                                    },
                                                },
                                            }}
                                        >
                                            <DocumentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                                            <ListItemText
                                                primary={
                                                    <MDTypography variant="body2" fontWeight="medium">
                                                        {document.name}
                                                    </MDTypography>
                                                }
                                                secondary={
                                                    <MDTypography variant="caption" color="text">
                                                        {document.type} • {document.uploadDate}
                                                    </MDTypography>
                                                }
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewDocument(document);
                                                }}
                                                sx={{ color: "#1A73E8" }}
                                            >
                                                <PreviewIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteDocument(document);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {selectedDocument ? (
                                <MDBox>
                                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <MDTypography variant="h6" fontWeight="medium">
                                            Document Details
                                        </MDTypography>
                                        <MDBox>
                                            <MDButton
                                                variant="outlined"
                                                color="warning"
                                                size="small"
                                                onClick={() => handlePreviewDocument(selectedDocument)}
                                                sx={{ mr: 1 }}
                                            >
                                                <Icon sx={{ mr: 1 }}>visibility</Icon>
                                                Preview
                                            </MDButton>
                                            <MDButton
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteDocument(selectedDocument)}
                                            >
                                                <Icon sx={{ mr: 1 }}>delete</Icon>
                                                Delete
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
                                    <MDBox mb={2} p={2} borderRadius="lg" bgColor="grey.100">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MDTypography variant="body2">
                                                    <strong>Name:</strong> {selectedDocument.name}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDTypography variant="body2">
                                                    <strong>Type:</strong> {selectedDocument.type}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDTypography variant="body2">
                                                    <strong>Size:</strong> {selectedDocument.size}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDTypography variant="body2">
                                                    <strong>Upload Date:</strong> {selectedDocument.uploadDate}
                                                </MDTypography>
                                            </Grid>
                                        </Grid>
                                    </MDBox>
                                    {selectedDocument.url && (
                                        <MDBox
                                            component="iframe"
                                            src={selectedDocument.url}
                                            width="100%"
                                            height="500px"
                                            title="Document Preview"
                                            sx={{
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                borderRadius: 2,
                                                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'
                                            }}
                                        />
                                    )}
                                </MDBox>
                            ) : (
                                <MDBox
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="200px"
                                    borderRadius="lg"
                                    bgcolor="grey.100"
                                >
                                    <MDTypography variant="body2" color="text">
                                        Select a document to view details
                                    </MDTypography>
                                </MDBox>
                            )}
                        </Grid>
                    </Grid>
                </MDBox>
            </Card>

            {/* Upload Document Dialog */}
            <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogContent>
                    <MDBox component="form" role="form" mt={2}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <MDButton
                            variant="gradient"
                            color="warning"
                            onClick={() => fileInputRef.current.click()}
                            sx={{ backgroundColor: "#f29f66" }}
                        >
                            <Icon sx={{ mr: 1 }}>upload_file</Icon>
                            Choose File
                        </MDButton>
                        {newDocument.file && (
                            <MDBox mt={2} p={2} borderRadius="lg" bgColor="grey.100">
                                <MDTypography variant="body2">
                                    <strong>Selected File:</strong> {newDocument.name}
                                </MDTypography>
                                <MDTypography variant="body2">
                                    <strong>Size:</strong> {newDocument.size}
                                </MDTypography>
                            </MDBox>
                        )}
                        <MDBox mt={2}>
                            <MDInput
                                fullWidth
                                label="Document Name"
                                value={newDocument.name}
                                onChange={(e) => setNewDocument(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                                placeholder="Enter document name"
                            />
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={handleCloseUploadDialog} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={handleUploadDocument}
                        color="warning"
                        variant="gradient"
                        sx={{ backgroundColor: "#f29f66" }}
                        disabled={!newDocument.file}
                    >
                        Upload
                    </MDButton>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Documents;