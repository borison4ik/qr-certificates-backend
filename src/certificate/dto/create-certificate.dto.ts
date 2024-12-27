import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateCertificateDto {
	@IsString()
	title: string

	@IsString()
	text?: string

	@IsNumber()
	totalPrice: number

	@IsNumber()
	spendPrice?: number

	@IsNumber()
	templateId?: number

	@IsBoolean()
	isActivated?: boolean
}

export class CertificateDto {
	@IsString()
	id: string

	@IsString()
	title: string

	@IsString()
	text?: string

	@IsNumber()
	totalPrice: number

	@IsNumber()
	spendPrice?: number

	@IsNumber()
	templateId?: number

	@IsBoolean()
	isActivated?: boolean
}
