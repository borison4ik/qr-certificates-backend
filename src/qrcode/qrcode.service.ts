import { Injectable } from '@nestjs/common'
import { join } from 'path'
import { image } from 'qr-image'
import * as fs from 'node:fs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class QrcodeService {
	constructor(private readonly configService: ConfigService) {}
	async create(id: string): Promise<string> {
		const fileURL = `${this.configService.get('SERVER_PUBLIC_URL')}/${id}.png`
		const filePath = `${join(__dirname, '..', '..', 'public', 'qr')}/${id}.png`
		console.log('filePath', filePath)
		return new Promise((res, rej) => {
			try {
				const frontUrl = `${this.configService.get('FRONT_URL')}/certificate/${id}`
				image(frontUrl, { type: 'png', margin: 2 }).pipe(
					fs.createWriteStream(filePath)
				)
				res(fileURL)
			} catch (err) {
				rej(err)
			}
		})
	}

	async delete(id: string): Promise<boolean> {
		const filePath = `${join(__dirname, '..', '..', 'public', 'qr')}/${id}.png`
		console.log('filePath', filePath)
		if (fs.existsSync(filePath)) {
			await fs.promises.unlink(filePath)
			return true
		} else {
			console.log('File not found')
		}
	}
}
