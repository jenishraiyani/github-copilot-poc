export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  authStorageKey: string;
}

export const environment: Environment = {
  production: false,
  apiBaseUrl: '/api',
  authStorageKey: 'copilot-poc.auth',
};
