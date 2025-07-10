const selectors = {
  getUsername: (state) => state.auth.data.username,
  getAuthorizationError: (state) => state.auth.error,
  getAuthorizationToken: (state) => state.auth.data.token,
};

export default selectors;
