import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'node:fs'
import { join } from 'node:path'
import { CertificateDto } from 'src/certificate/dto/create-certificate.dto'
import puppeteer from 'puppeteer'
import { getHtml } from './get-html'

@Injectable()
export class PdfgeneratorService {
	constructor(private readonly configService: ConfigService) {}

	async create(dto: CertificateDto) {
		const filePath = `${join(__dirname, '..', '..', 'public', 'pdf')}/${dto.id}.pdf`
		const browser = await puppeteer.launch({ headless: true })
		const page = await browser.newPage()
		const html = await getHtml(dto)
		await page.setContent(html, {
			waitUntil: 'networkidle0'
		})
		await page.pdf({
			path: filePath,
			format: 'A5',
			printBackground: true,
			landscape: true
		})
		browser.close()
	}

	async delete(id: string): Promise<boolean> {
		const filePath = `${join(__dirname, '..', '..', 'public', 'pdf')}/${id}.pdf`
		console.log('filePath', filePath)
		if (fs.existsSync(filePath)) {
			await fs.promises.unlink(filePath)
			return true
		} else {
			console.log('File not found')
			throw new Error('File not found')
		}
	}
}
