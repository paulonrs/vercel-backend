class User {
  id!: string;
  email!: string;
  name!: string;
  password!: string;
  createdAt!: Date;
  updateAt?: Date | null;
  deletadAt?: Date | null;
}

export default User;
