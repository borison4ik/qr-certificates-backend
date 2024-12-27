import { Module } from '@nestjs/common'
import { QrcodeController } from './qrcode.controller'
import { QrcodeService } from './qrcode.service'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule],
	controllers: [QrcodeController],
	providers: [QrcodeService],
	exports: [QrcodeService]
})
export class QrcodeModule {}
