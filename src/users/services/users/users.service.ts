import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  createUserParams,
  createuserPostParams,
  createuserProfileParams,
  updateUserParams,
} from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createUser(userDetails: createUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  findUsers() {
    return this.userRepository.find({ relations: ['profile','posts'] });
  }
  updateUser(id: number, userDetails: updateUserParams) {
    this.userRepository.update({ id }, { ...userDetails });
  }
  deleteUser(id: number) {
    this.userRepository.delete({ id });
  }
  async createuserProfile(
    id: number,
    userProfileDetails: createuserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found.can not create user profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newProfile = this.profileRepository.create(userProfileDetails);
    const userProfile = await this.profileRepository.save(newProfile);
    user.profile = userProfile;
    return this.userRepository.save(user);
  }
  async createUserPost(id: number, userPostDetails: createuserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found.can not create user profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPost = this.postRepository.create({
      ...userPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }
}
