const sessionService = {
  getAuthToken: () => {
    const token = localStorage.getItem('token');
    return token;
  },
  getRole: () => {
    if (typeof window !== 'undefined') return window.localStorage.getItem('role');
    return null;
  },
};

export default sessionService;
