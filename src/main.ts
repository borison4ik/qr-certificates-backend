import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.SERVER_PORT || 4200
	const FRONT_URL = process.env.FRONT_URL || 'http://localhost:3000'

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: [FRONT_URL],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	await app.listen(PORT, () => console.log(`Server started on POTR = ${PORT}`))
}
bootstrap()
