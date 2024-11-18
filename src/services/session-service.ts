const sessionService = {
  getAuthToken: () => {
    const token = localStorage.getItem('token');
    return token;
  },
  getRole: () => {
    const role = localStorage.getItem('role');
    return role;
  },
};

export default sessionService;
