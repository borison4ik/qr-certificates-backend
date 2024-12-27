import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { QrcodeService } from './qrcode.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('qrcode')
export class QrcodeController {
	constructor(private readonly qrcodeService: QrcodeService) {}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return await this.qrcodeService.create(id)
	}
}
