interface UserControllerInterface {
  getAllUsers(req: any, res: any): Promise<void>;
  addUsers(req: any, res: any): Promise<void>;
  editUsers(req: any, res: any): Promise<void>;
  inactiveUsers(req: any, res: any): Promise<void>;
  activeUsers(req: any, res: any): Promise<void>;
}

export default UserControllerInterface;
