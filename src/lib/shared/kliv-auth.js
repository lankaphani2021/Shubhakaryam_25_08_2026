// Mock implementation of kliv-auth
const auth = {
  signUp: async (email, password, name, locale, metadata) => {
    console.log('[Mock Auth] Signing up:', email);
    return { user: { email, name } };
  },
  signIn: async (email, password) => {
    console.log('[Mock Auth] Signing in:', email);
    return { user: { email } };
  },
  signOut: async () => {
    console.log('[Mock Auth] Signing out');
  },
  getUser: async (forceRefresh = false) => {
    return null;
  },
  getCurrentUser: async () => {
    return null;
  },
  updateUser: async (data) => {
    console.log('[Mock Auth] Updating user:', data);
    return data;
  },
  requestPasswordReset: async (email) => {
    console.log('[Mock Auth] Password reset requested:', email);
    return true;
  },
  completePasswordReset: async (token, password) => {
    console.log('[Mock Auth] Password reset completed');
    return true;
  },
  listUsers: async (opts = {}) => {
    return [];
  },
  hasGroup: (key) => false,
  isSignedIn: false
};

export default auth;
