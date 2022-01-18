import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
      return res.status(401).send({ message: 'Unauthorized request' });
    }

    if (!process.env.KEY) {
      return res.status(401).send({ message: 'Missing configuration' });
    }

    if (apiKey != `Bearer ${process.env.KEY}`) {
      return res.status(401).send({ message: 'Wrong API Key' });
    }

    next();
  }
}
