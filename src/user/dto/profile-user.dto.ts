export class ProfileUser {
  constructor(user: ProfileUser) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
  id: number;
  email: string;
  createdAt: Date;
}
