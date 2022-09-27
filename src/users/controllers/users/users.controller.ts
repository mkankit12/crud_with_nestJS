import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/CreateUser.dto';
import { createUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { UserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }
  @Post()
  createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }
  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: UserProfileDto,
  ) {
    return this.userService.createuserProfile(id, createUserProfileDto);
  }
  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: createUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
