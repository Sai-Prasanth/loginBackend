import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { readUsers, writeUsers, User } from '../utils/file';

const failedAttempts: Record<string, { count: number; lastAttempt: number }> = {};
const ipBlocklist: Record<string, { count: number; lastAttempt: number }> = {};

const now = () => new Date().getTime();
const lockDuration = 15 * 60 * 1000;
const maxAttempts = 5;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const users = await readUsers();
    if (users.find(u => u.email === email || u.username === username)) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashed });
    await writeUsers(users);

    res.status(201).json({ message: 'Registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed.', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const ip:any = req.ip;

  const ipData = ipBlocklist[ip];
  if (ipData && ipData.count >= maxAttempts && now() - ipData.lastAttempt < lockDuration) {
    return res.status(403).json({ message: 'Too many failed attempts from this IP. Try again later.' });
  }

  const users = await readUsers();
  const user = users.find(u => u.username === username);
console.log(user)
  if (!user) {
    trackFailed(ip);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const userFails = failedAttempts[username];
  if (userFails && userFails.count >= maxAttempts && now() - userFails.lastAttempt < lockDuration) {
    return res.status(403).json({ message: 'Account locked due to too many failed attempts. Try again later.' });
  }

  //const match = await bcrypt.compare(password, user.password);
  //const hashed = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, user.password);

  if (!match) {
    trackFailed(ip, username);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // reset on success
  delete failedAttempts[username];
  delete ipBlocklist[ip];

  res.status(200).json({ message: 'Login successful.' });
};

const trackFailed = (ip: string, username?: string) => {
  const nowTime = now();

  if (username) {
    const userData = failedAttempts[username] || { count: 0, lastAttempt: 0 };
    userData.count += 1;
    userData.lastAttempt = nowTime;
    failedAttempts[username] = userData;
  }

  const ipData = ipBlocklist[ip] || { count: 0, lastAttempt: 0 };
  ipData.count += 1;
  ipData.lastAttempt = nowTime;
  ipBlocklist[ip] = ipData;
};
