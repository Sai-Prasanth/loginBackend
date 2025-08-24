export const config = {
    dataFile: './src/users.json',
    port: process.env.PORT || 3000,
    lockDurationMs: 15 * 60 * 1000,
    maxAttempts: 5,
  };
  