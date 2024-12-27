import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	ValidationPipe,
	UsePipes,
	HttpCode,
	Put
} from '@nestjs/common'
import { CertificateService } from './certificate.service'
import { CreateCertificateDto } from './dto/create-certificate.dto'
import { UpdateCertificateDto } from './dto/update-certificate.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('certificate')
export class CertificateController {
	constructor(private readonly certificateService: CertificateService) {}

	@Get()
	@Auth()
	async findAll() {
		return await this.certificateService.findAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: CreateCertificateDto) {
		return await this.certificateService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.certificateService.findById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
		return await this.certificateService.update(id, dto)
	}
}
