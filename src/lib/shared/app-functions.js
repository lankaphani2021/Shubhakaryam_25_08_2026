// Mock implementation of app-functions
const functions = {
  invoke: async (name, data, options = {}) => {
    console.log(`[Mock Functions] Invoking: ${name}`, data);
    return null;
  },
  get: async (name, query = {}) => {
    console.log(`[Mock Functions] GET: ${name}`, query);
    return null;
  },
  post: async (name, data) => {
    console.log(`[Mock Functions] POST: ${name}`, data);
    return null;
  },
  put: async (name, data) => {
    console.log(`[Mock Functions] PUT: ${name}`, data);
    return null;
  },
  delete: async (name, data) => {
    console.log(`[Mock Functions] DELETE: ${name}`, data);
    return null;
  }
};

export default functions;
