export const getApiUrl = () => {
  if (__DEV__) {
    // Use your computer's IP address when running in development
    return "http://0.0.0.0:3000"; // Replace X with your actual IP
  } else {
    // Use your production server URL
    return "https://your-production-server.com";
  }
};
