import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CertificateModule } from './certificate/certificate.module'
import { join } from 'node:path'
import { QrcodeService } from './qrcode/qrcode.service'
import { QrcodeModule } from './qrcode/qrcode.module'
import { PdfgeneratorService } from './pdfgenerator/pdfgenerator.service'
import { PdfgeneratorModule } from './pdfgenerator/pdfgenerator.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public/'),
			serveRoot: '/static/images'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		CertificateModule,
		QrcodeModule,
		PdfgeneratorModule
	],
	providers: [QrcodeService, PdfgeneratorService]
})
export class AppModule {}
