import { Controller, Delete, Get, HttpCode } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Get('profile')
	@Auth()
	async getById(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@HttpCode(200)
	@Delete('profile')
	@Auth()
	async deleteUser(@CurrentUser('id') id: string) {
		await this.userService.delete(id)
		return true
	}
}
