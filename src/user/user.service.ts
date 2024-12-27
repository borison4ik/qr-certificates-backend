import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	private USER_SELECT = {
		id: true,
		email: true,
		name: true,
		password: true
	}

	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.user.findMany({
			select: this.USER_SELECT
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = profile

		return {
			user: rest
		}
	}

	async getById(id: string) {
		return await this.prisma.user.findUnique({
			where: {
				id
			},
			select: this.USER_SELECT
		})
	}

	async getByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email
			},
			select: this.USER_SELECT
		})
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return await this.prisma.user.create({
			data: user,
			select: this.USER_SELECT
		})
	}

	async delete(id: string) {
		return await this.prisma.user.delete({
			where: {
				id
			},
			select: this.USER_SELECT
		})
	}
}
