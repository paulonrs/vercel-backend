class UserResponse {
  id!: string;
  email!: string;
  name!: string;
  createdAt!: Date;
  updateAt?: Date | null;
  deletadAt?: Date | null;
}

export default UserResponse;
