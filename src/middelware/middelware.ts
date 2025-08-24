// import { Request, Response, NextFunction } from 'express';
// import { getRecentAttempts } from '../service/service';

// export const checkLoginAttempts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const ip:any = req.ip;
//   const email = req.body.email;

//   const recentAttempts = await getRecentAttempts(ip, email);

//   if (recentAttempts >= 5) {
//     return res.status(429).json({
//       message: 'Too many failed attempts from this IP or email. Try again in 15 minutes.'
//     });
//   }

//   next();
// };
