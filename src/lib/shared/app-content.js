// Mock implementation of app-content
export const content = {
  uploadFile: async (file, path) => {
    console.log(`[Mock Content] Uploading file to: ${path}`);
    return { path };
  },
  listFiles: async (path) => {
    console.log(`[Mock Content] Listing files in: ${path}`);
    return { files: [] };
  },
  moveFile: async (from, to) => {
    console.log(`[Mock Content] Moving file from ${from} to ${to}`);
    return true;
  },
  deleteFile: async (path) => {
    console.log(`[Mock Content] Deleting file: ${path}`);
    return true;
  }
};
