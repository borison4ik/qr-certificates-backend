import { Module } from '@nestjs/common'
import { CertificateService } from './certificate.service'
import { CertificateController } from './certificate.controller'
import { PrismaService } from 'src/prisma.service'
import { QrcodeService } from 'src/qrcode/qrcode.service'
import { ConfigService } from '@nestjs/config'
import { PdfgeneratorService } from 'src/pdfgenerator/pdfgenerator.service'

@Module({
	controllers: [CertificateController],
	providers: [
		CertificateService,
		PrismaService,
		QrcodeService,
		ConfigService,
		PdfgeneratorService
	],
	exports: [CertificateService]
})
export class CertificateModule {}
