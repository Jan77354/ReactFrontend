import axios from 'axios';

class GoogleCalendarService {
    constructor() {
        // Google OAuth configuration
        this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
        this.redirectUri = 'http://localhost:3000/oauth2callback';
    }

    // Initiate Google OAuth flow
    initiateOAuthFlow() {
        const scopes = [
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/calendar.events.readonly'
        ].join(' ');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${this.clientId}` +
            `&redirect_uri=${this.redirectUri}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent(scopes)}` +
            `&access_type=offline`;

        window.location.href = authUrl;
    }

    // Exchange authorization code for tokens
    async exchangeCodeForTokens(code) {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: this.redirectUri
            });

            // Store tokens securely (consider using encrypted storage)
            localStorage.setItem('google_access_token', response.data.access_token);
            localStorage.setItem('google_refresh_token', response.data.refresh_token);

            return response.data;
        } catch (error) {
            console.error('Error exchanging code for tokens', error);
            throw error;
        }
    }

    // Fetch Google Calendar events
    async fetchGoogleCalendarEvents() {
        const accessToken = localStorage.getItem('google_access_token');

        if (!accessToken) {
            throw new Error('No access token available');
        }

        try {
            const response = await axios.get(
                'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        timeMin: (new Date()).toISOString(), // Events from now
                        maxResults: 10,
                        singleEvents: true,
                        orderBy: 'startTime'
                    }
                }
            );

            // Transform Google Calendar events to your app's event format
            return response.data.items.map(event => ({
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
                className: 'primary', // You can customize this
                source: 'google'
            }));
        } catch (error) {
            console.error('Error fetching Google Calendar events', error);
            throw error;
        }
    }

    // Refresh access token if expired
    async refreshAccessToken() {
        const refreshToken = localStorage.getItem('google_refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            });

            localStorage.setItem('google_access_token', response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing access token', error);
            throw error;
        }
    }

    // Logout and clear tokens
    logout() {
        localStorage.removeItem('google_access_token');
        localStorage.removeItem('google_refresh_token');
    }
}

export default new GoogleCalendarService();