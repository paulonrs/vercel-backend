import { Request, Response } from 'express';
import fs from 'fs';

import { BaseController } from '../baseController';

import { inject, injectable } from 'inversify';
import LogsControllerInterface from './logsControllerInterface';

@injectable()
class LogsController extends BaseController implements LogsControllerInterface {
  constructor() {
    super();
  }
  getLogs = async (req: any, res: any) => {
    const file = fs.readFileSync('./app1.log');
    return res.json(file.toString());
  };

  getLogsError = async (req: any, res: any) => {
    const items: any[] = [];
    fs.readdir(process.cwd() + '/src', function (err, filenames) {
      if (err) {
        return res.json({ err });
      }
      filenames.forEach(function (filename) {
        items.push(filename);
      });
      return req.json(items);
    });
  };
}
