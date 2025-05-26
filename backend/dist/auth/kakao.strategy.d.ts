import { UsersService } from '../users/users.service';
declare const KakaoStrategy_base: new (...args: any) => any;
export declare class KakaoStrategy extends KakaoStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<import("../users/entities/user.entity").User>;
}
export {};
