// ...create this file if it doesn't exist...
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}
