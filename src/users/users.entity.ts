import { Exclude } from "class-transformer";

export class UsersEntity {
  email: string;

  password: string;

  userName: string;

  @Exclude()
  id: string;

  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  @Exclude()
  profilePath: string;

  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
}
