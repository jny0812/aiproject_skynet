import { Exclude } from 'class-transformer';
export class UserEntity {
    id: string;
    username: string;
    @Exclude()
    password: string;
    email: string;
    profilePath: string;
    description: string;
}
