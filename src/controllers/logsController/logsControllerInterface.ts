interface LogsControllerInterface {
  getLogs(req: any, res: any): Promise<void>;
  getLogsError(req: any, res: any): Promise<void>;
}

export default LogsControllerInterface;
