import fs from 'fs/promises';
import { config } from '../config';

export interface User {
  username: string;
  email: string;
  password: string;
}

export const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(config.dataFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const writeUsers = async (users: User[]) => {
  await fs.writeFile(config.dataFile, JSON.stringify(users, null, 2));
};
