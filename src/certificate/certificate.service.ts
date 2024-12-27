import { HttpException, Injectable } from '@nestjs/common'
import {
	CertificateDto,
	CreateCertificateDto
} from './dto/create-certificate.dto'
import { UpdateCertificateDto } from './dto/update-certificate.dto'
import { PrismaService } from 'src/prisma.service'
import { Prisma } from 'prisma/generated/client'
import { QrcodeService } from 'src/qrcode/qrcode.service'
import { PdfgeneratorService } from 'src/pdfgenerator/pdfgenerator.service'

@Injectable()
export class CertificateService {
	constructor(
		private prisma: PrismaService,
		private readonly qrcodeService: QrcodeService,
		private readonly pdfgeneratorService: PdfgeneratorService
	) {
		Prisma.Decimal.set({ precision: 5, rounding: 2 })
	}

	async create(dto: CreateCertificateDto) {
		const newCertificate = await this.prisma.certificate.create({
			data: dto
		})

		await this.qrcodeService.create(newCertificate.id)
		await this.pdfgeneratorService.create(newCertificate)

		return {
			...newCertificate
		}
	}

	async findAll() {
		return await this.prisma.certificate.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async findById(id: string) {
		return await this.prisma.certificate.findUnique({
			where: {
				id
			}
		})
	}

	async update(id: string, dto: UpdateCertificateDto) {
		const balance = dto.totalPrice - dto.spendPrice

		if (balance < 0) {
			return new HttpException('Недостаточно средств', 400)
		}

		if (balance === 0) {
			try {
				await this.qrcodeService.delete(id)
				await this.pdfgeneratorService.delete(id)
			} catch (e) {
				return new HttpException('Не удалось удалить файлы', 500)
			}

			return await this.prisma.certificate.update({
				where: {
					id
				},
				data: { ...dto, isActivated: false }
			})
		}

		if (dto.isActivated) {
			try {
				await this.qrcodeService.create(id)
				await this.pdfgeneratorService.create({ ...dto, id } as CertificateDto)
			} catch (e) {
				return new HttpException('Не удалось создать файлы', 500)
			}
		} else {
			try {
				await this.qrcodeService.delete(id)
				await this.pdfgeneratorService.delete(id)
			} catch (e) {
				return new HttpException('Не удалось удалить файлы', 500)
			}
		}

		return await this.prisma.certificate.update({
			where: {
				id
			},
			data: dto
		})
	}
}
