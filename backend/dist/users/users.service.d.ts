import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(email: string, password: string, name: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByKakaoId(kakaoId: string): Promise<User | null>;
    findOrCreateKakaoUser(data: {
        email?: string;
        name: string;
    }): Promise<User>;
}
