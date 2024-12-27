import { Module } from '@nestjs/common'
import { PdfgeneratorService } from './pdfgenerator.service'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma.service'

@Module({
	providers: [PdfgeneratorService, ConfigService, PrismaService],
	exports: [PdfgeneratorService]
})
export class PdfgeneratorModule {}
