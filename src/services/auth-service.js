import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    console.log('Attempting login with:', payload.data?.attributes?.email || 'email not found');
    console.log('Full payload:', payload);
    const loginEndpoint = "login";

    try {
      console.log('Sending request to:', loginEndpoint);
      const response = await HttpService.post(loginEndpoint, payload);
      console.log('Login response received:', response);

      // Examine the response structure
      console.log('Response type:', typeof response);

      // Try to find the token regardless of structure
      let token = null;
      if (response && response.access_token) {
        token = response.access_token;
        console.log('Found access_token in response');
      } else if (response && response.token) {
        token = response.token;
        console.log('Found token in response');
      } else if (response && response.data && response.data.token) {
        token = response.data.token;
        console.log('Found token in response.data');
      } else if (response && response.user && response.user.token) {
        token = response.user.token;
        console.log('Found token in response.user');
      }

      if (token) {
        console.log('Token found, storing in localStorage');
        localStorage.setItem('token', token);

        // Also store refresh token if available
        if (response.refresh_token) {
          localStorage.setItem('refreshToken', response.refresh_token);
          console.log('Refresh token stored');
        }

        // Verify it was stored
        const storedToken = localStorage.getItem('token');
        console.log('Stored token (first 10 chars):', storedToken.substring(0, 10));
      } else {
        console.error('No token found in response structure:', response);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  register = async (credentials) => {
    const registerEndpoint = "register";
    return await HttpService.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const logoutEndpoint = "logout";
    // Clear token on logout
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
    return await HttpService.post(logoutEndpoint);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = "password-forgot";
    return await HttpService.post(forgotPassword, payload);
  };

  resetPassword = async (credentials) => {
    const resetPassword = "password-reset";
    return await HttpService.post(resetPassword, credentials);
  };

  getProfile = async () => {
    const getProfile = "me";
    console.log('Fetching profile, token:', localStorage.getItem('token'));
    return await HttpService.get(getProfile);
  };

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return await HttpService.patch(updateProfile, newInfo);
  };
}

export default new AuthService();