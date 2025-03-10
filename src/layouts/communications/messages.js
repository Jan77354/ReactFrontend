import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// MUI Components
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import AttachmentIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';

function Messages() {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Shelby Goode',
            lastMessage: 'Lorem ipsum is simply dummy text',
            time: '1d',
            avatar: 'https://via.placeholder.com/40'
        },
        {
            id: 2,
            name: 'Robert Bacinis',
            lastMessage: 'Lorem ipsum is simply dummy text',
            time: '5d',
            avatar: 'https://via.placeholder.com/40'
        },
        {
            id: 3,
            name: 'John Carlo',
            lastMessage: 'Lorem ipsum is simply dummy text',
            time: '15m',
            avatar: 'https://via.placeholder.com/40'
        },
    ]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Personal');
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedContact) {
            const contactMessages = messages[selectedContact.id] || [];
            const updatedMessages = {
                ...messages,
                [selectedContact.id]: [
                    ...contactMessages,
                    {
                        id: Date.now(),
                        sender: 'You',
                        text: newMessage,
                        type: 'text',
                        timestamp: ''
                    }
                ]
            };
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={2} mb={3}>
                <MDBox
                    border={1}
                    borderRadius="lg"
                    display="flex"
                    height="calc(100vh - 180px)"
                    overflow="hidden"
                    borderColor="secondary.main"
                >
                    {/* Left Sidebar */}
                    <MDBox
                        width="250px"
                        borderRight={1}
                        borderColor="secondary.main"
                        display="flex"
                        flexDirection="column"
                        bgcolor="white"
                    >
                        <MDBox display="flex" p={1}>
                            {['Personal', 'Teams'].map((tab) => (
                                <MDButton
                                    key={tab}
                                    variant={activeTab === tab ? 'gradient' : 'text'}
                                    color="info"
                                    size="small"
                                    fullWidth
                                    sx={{
                                        mx: 0.5,
                                        py: 0.5,
                                        opacity: activeTab === tab ? 1 : 0.5,
                                        fontWeight: 'bold',
                                    }}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </MDButton>
                            ))}
                        </MDBox>

                        <MDBox px={2} pb={1}>
                            <MDInput
                                fullWidth
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                startAdornment={<SearchIcon />}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f2f5',
                                        borderRadius: '20px',
                                        height: '35px',
                                    }
                                }}
                            />
                        </MDBox>

                        <MDBox flexGrow={1} overflow="auto">
                            {filteredContacts.map(contact => (
                                <MDBox
                                    key={contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 1,
                                        px: 2,
                                        cursor: 'pointer',
                                        background: selectedContact?.id === contact.id
                                            ? '#F97316'
                                            : 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#f0f2f5'
                                        }
                                    }}
                                >
                                    <Avatar
                                        src={contact.avatar}
                                        alt={contact.name}
                                        sx={{
                                            mr: 2,
                                            width: 35,
                                            height: 35,
                                            border: selectedContact?.id === contact.id
                                                ? '2px solid white'
                                                : 'none'
                                        }}
                                    />
                                    <MDBox flexGrow={1}>
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color={selectedContact?.id === contact.id ? 'white' : 'dark'}
                                        >
                                            {contact.name}
                                        </MDTypography>
                                        <MDTypography
                                            variant="caption"
                                            color={selectedContact?.id === contact.id ? 'white' : 'text'}
                                            display="block"
                                            opacity={selectedContact?.id === contact.id ? 0.7 : 1}
                                        >
                                            {contact.lastMessage}
                                        </MDTypography>
                                    </MDBox>
                                    <MDTypography
                                        variant="caption"
                                        color={selectedContact?.id === contact.id ? 'white' : 'text'}
                                        opacity={selectedContact?.id === contact.id ? 0.7 : 1}
                                    >
                                        {contact.time}
                                    </MDTypography>
                                </MDBox>
                            ))}
                        </MDBox>
                    </MDBox>

                    {/* Right Message Area */}
                    <MDBox
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        overflow="hidden"
                    >
                        {selectedContact ? (
                            <>
                                {/* Chat Header */}
                                <MDBox
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    p={1}
                                    px={2}
                                    borderBottom={1}
                                    borderColor="secondary.main"
                                >
                                    <MDBox display="flex" alignItems="center">
                                        <Avatar
                                            src={selectedContact.avatar}
                                            alt={selectedContact.name}
                                            sx={{ mr: 2, width: 35, height: 35 }}
                                        />
                                        <MDBox>
                                            <MDTypography variant="button" fontWeight="medium">
                                                {selectedContact.name}
                                            </MDTypography>
                                            <MDTypography variant="caption" color="text">
                                                Online
                                            </MDTypography>
                                        </MDBox>
                                    </MDBox>
                                    <MDBox>
                                        <IconButton size="small" sx={{ mr: 1 }}>
                                            <CallIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" sx={{ mr: 1 }}>
                                            <VideocamIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small">
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </MDBox>
                                </MDBox>

                                {/* Messages */}
                                <MDBox
                                    flexGrow={1}
                                    overflow="auto"
                                    p={2}
                                    bgcolor="#f9fafb"
                                >
                                    {selectedContact && (!messages[selectedContact.id] || messages[selectedContact.id].length === 0) ? (
                                        <MDBox
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            height="100%"
                                        >
                                            <MDTypography variant="body2" color="text">
                                                Start a conversation with {selectedContact.name}
                                            </MDTypography>
                                        </MDBox>
                                    ) : (
                                        (messages[selectedContact.id] || []).map(message => (
                                            <MDBox
                                                key={message.id}
                                                display="flex"
                                                justifyContent={message.sender === 'You' ? 'flex-end' : 'flex-start'}
                                                mb={1}
                                            >
                                                <MDBox
                                                    bgcolor={message.sender === 'You' ? 'transparent' : '#f0f2f5'}
                                                    color={message.sender === 'You' ? 'black' : 'black'}
                                                    p={1}
                                                    borderRadius="12px"
                                                    maxWidth="70%"
                                                    sx={{
                                                        border: message.sender === 'You'
                                                            ? '1px solid black'
                                                            : 'none',
                                                        backgroundColor: message.sender === 'You'
                                                            ? 'transparent'
                                                            : '#f0f2f5'
                                                    }}
                                                >
                                                    <MDTypography variant="caption">
                                                        {message.text}
                                                    </MDTypography>
                                                </MDBox>
                                            </MDBox>
                                        ))
                                    )}
                                </MDBox>

                                {/* Message Input */}
                                <MDBox
                                    display="flex"
                                    alignItems="center"
                                    p={1}
                                    px={2}
                                    borderTop={1}
                                    borderColor="secondary.main"
                                >
                                    <IconButton size="small" sx={{ mr: 1 }}>
                                        <AttachmentIcon fontSize="small" />
                                    </IconButton>
                                    <MDInput
                                        fullWidth
                                        placeholder="Type a message"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage();
                                            }
                                        }}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                backgroundColor: '#f0f2f5',
                                                borderRadius: '20px',
                                                height: '35px',
                                            }
                                        }}
                                    />
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        sx={{ ml: 1 }}
                                        onClick={handleSendMessage}
                                    >
                                        <SendIcon fontSize="small" />
                                    </IconButton>
                                </MDBox>
                            </>
                        ) : (
                            <MDBox
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexGrow={1}
                            >
                                <MDTypography variant="body2" color="text">
                                    Select a contact to start messaging
                                </MDTypography>
                            </MDBox>
                        )}
                    </MDBox>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    );
}

export default Messages;