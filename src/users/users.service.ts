import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, JoinType } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      joinType: JoinType.EMAIL,
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByKakaoId(kakaoId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { kakaoId } });
  }

  async findOrCreateKakaoUser(data: {
    email?: string;
    name: string;
  }): Promise<User> {
    let user: User | null = null;

    if (data.email) {
      user = await this.usersRepository.findOne({
        where: { email: data.email },
      });
    }

    if (!user) {
      // 이메일이 없거나 기존 사용자가 없는 경우 새로 생성
      const randomEmail = `kakao_${Math.random().toString(36).substring(2)}@kakao.com`;
      user = this.usersRepository.create({
        email: data.email || randomEmail,
        name: data.name,
        password: await bcrypt.hash(Math.random().toString(36), 10),
        joinType: JoinType.KAKAO,
      });
      user = await this.usersRepository.save(user);
    } else if (user.joinType === JoinType.EMAIL) {
      // 기존 이메일 사용자인 경우 카카오 계정으로 업데이트
      user.joinType = JoinType.KAKAO;
      user = await this.usersRepository.save(user);
    }

    return user;
  }
}
