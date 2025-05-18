import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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
    kakaoId: string;
    email?: string;
    name: string;
  }): Promise<User> {
    let user = await this.findByKakaoId(data.kakaoId);

    if (!user) {
      user = this.usersRepository.create({
        kakaoId: data.kakaoId,
        email: data.email,
        name: data.name,
        password: await bcrypt.hash(Math.random().toString(36), 10), // 임의의 비밀번호 생성
      });
      user = await this.usersRepository.save(user);
    }

    return user;
  }
}
