import { Request, Response } from 'express';

class HomeController {
  getHome = async (req: Request, res: Response) => {
    try {
      res.send('Hello');
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };
}

export default HomeController;
