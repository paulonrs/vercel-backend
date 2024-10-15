import { Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  protected sendResponse(res: Response, data: any, statusCode = 200) {
    res.status(statusCode).json(data);
  }

  protected handleError(res: Response, error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
