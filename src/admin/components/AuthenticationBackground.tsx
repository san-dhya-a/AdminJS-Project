import React, { useEffect } from 'react';
import { useCurrentAdmin, ApiClient } from 'adminjs';

const api = new ApiClient();

const AuthenticationBackgroundComponentOverride = () => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  useEffect(() => {
    // Only set up the interval if there's an admin logged in
    if (!currentAdmin) return;

    // Call refresh token API periodically, e.g., every 5 minutes (300000 ms)
    // Or adjust interval to your session expiration time.
    const interval = setInterval(async () => {
      try {
        const response = await api.refreshToken({});
        const { data } = response;
        if (data) {
          setCurrentAdmin(data);
        }
      } catch (error) {
        console.error('Failed to refresh admin session:', error);
      }
    }, 5 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [currentAdmin, setCurrentAdmin]);

  return null;
}

export default AuthenticationBackgroundComponentOverride;
