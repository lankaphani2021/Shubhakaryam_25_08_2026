declare module "@/lib/shared/kliv-database.js" {
  const db: {
    query: (table: string, params?: Record<string, string>) => Promise<any>;
    get: (table: string, id: string | number) => Promise<any>;
    insert: (table: string, data: Record<string, unknown>) => Promise<any>;
    update: (
      table: string,
      filter: Record<string, string>,
      data: Record<string, unknown>
    ) => Promise<any>;
    delete: (table: string, filter: Record<string, string>) => Promise<any>;
    count: (table: string, params?: Record<string, string>) => Promise<number>;
  };
  export default db;
}

declare module "@/lib/shared/kliv-auth.js" {
  const auth: {
    signUp: (email: string, password: string, name?: string, locale?: string, metadata?: any) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    getUser: (forceRefresh?: boolean) => Promise<any>;
    getCurrentUser: () => Promise<any>;
    updateUser: (data: Record<string, unknown>) => Promise<any>;
    requestPasswordReset: (email: string) => Promise<any>;
    completePasswordReset: (token: string, password: string) => Promise<any>;
    listUsers: (opts?: Record<string, unknown>) => Promise<any>;
    hasGroup: (key: string) => boolean;
    isSignedIn: boolean;
  };
  export default auth;
}

declare module "@/lib/shared/kliv-functions.js" {
  const functions: {
    invoke: (name: string, data?: unknown, options?: Record<string, unknown>) => Promise<any>;
    get: (name: string, query?: Record<string, string>) => Promise<any>;
    post: (name: string, data?: unknown) => Promise<any>;
    put: (name: string, data?: unknown) => Promise<any>;
    delete: (name: string, data?: unknown) => Promise<any>;
  };
  export default functions;
}

declare module "@/lib/shared/kliv-content.js" {
  export const content: {
    uploadFile: (file: File, path: string) => Promise<{ path: string }>;
    listFiles: (path: string) => Promise<{ files: any[] }>;
    moveFile: (from: string, to: string) => Promise<any>;
    deleteFile: (path: string) => Promise<any>;
  };
}
