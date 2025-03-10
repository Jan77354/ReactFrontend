import React, { useState, useRef } from 'react';
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
    IconButton
} from '@mui/material';
import {
    DescriptionOutlined as DocumentIcon,
    CloudUpload as UploadIcon,
    VisibilityOutlined as PreviewIcon,
    DeleteOutline as DeleteIcon
} from '@mui/icons-material';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

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
        }
    };

    const handlePreviewDocument = (document) => {
        // In a real application, this would open the document in a viewer or download it
        window.open(document.url, '_blank');
    };

    return (
        <Grid item xs={12}>
            <Card>
                <MDBox p={3}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <MDTypography variant="h5" fontWeight="medium">
                            Documents
                        </MDTypography>
                        <MDButton
                            variant="gradient"
                            color="info"
                            onClick={handleOpenUploadDialog}
                        >
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
                                                    backgroundColor: 'rgba(33, 150, 243, 0.1)', // Light blue background
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                                    },
                                                },
                                            }}
                                        >
                                            <DocumentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                                            <ListItemText
                                                primary={document.name}
                                                secondary={`${document.type} • ${document.uploadDate}`}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewDocument(document);
                                                }}
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
                                                variant="gradient"
                                                color="info"
                                                size="small"
                                                onClick={() => handlePreviewDocument(selectedDocument)}
                                                sx={{ mr: 1 }}
                                            >
                                                Preview
                                            </MDButton>
                                            <MDButton
                                                variant="gradient"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteDocument(selectedDocument)}
                                            >
                                                Delete
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDTypography variant="body2">
                                            <strong>Name:</strong> {selectedDocument.name}
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            <strong>Type:</strong> {selectedDocument.type}
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            <strong>Size:</strong> {selectedDocument.size}
                                        </MDTypography>
                                        <MDTypography variant="body2">
                                            <strong>Upload Date:</strong> {selectedDocument.uploadDate}
                                        </MDTypography>
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
                                                borderRadius: 2
                                            }}
                                        />
                                    )}
                                </MDBox>
                            ) : (
                                <MDTypography variant="body2" align="center">
                                    Select a document to view details
                                </MDTypography>
                            )}
                        </Grid>
                    </Grid>
                </MDBox>
            </Card>

            {/* Upload Document Dialog */}
            <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogContent>
                    <MDBox mt={2}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <MDButton
                            variant="gradient"
                            color="info"
                            onClick={() => fileInputRef.current.click()}
                            startIcon={<UploadIcon />}
                        >
                            Choose File
                        </MDButton>
                        {newDocument.file && (
                            <MDBox mt={2}>
                                <MDTypography variant="body2">
                                    <strong>Selected File:</strong> {newDocument.name}
                                </MDTypography>
                                <MDTypography variant="body2">
                                    <strong>Size:</strong> {newDocument.size}
                                </MDTypography>
                            </MDBox>
                        )}
                        <MDBox mt={2}>
                            <TextField
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
                    <Button onClick={handleCloseUploadDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUploadDocument}
                        color="primary"
                        variant="contained"
                        disabled={!newDocument.file}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Documents;