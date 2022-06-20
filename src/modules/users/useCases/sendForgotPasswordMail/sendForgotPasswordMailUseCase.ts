import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/MailProvaider/IMailProvider'
import { AppError } from '../../../../shared/erros/Apperror'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

@injectable()
class SendForgotPasswordMailUseCase {

	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

		@inject('EtherealMailProvider')
		private mailProvider: IMailProvider
	){}

	async execute (email: string): Promise<void> {

		const user = await this.usersRepository.findByEmail(email)

		if(!user){
			throw new AppError('User does not exists', 404)
		}

		const token = uuid()

		const espires_date = this.dateProvider.addHours(3)

		await this.usersTokensRepository.create({
			refresh_token: token,
			user_id: user.id,
			espires_date
		})

		await this.mailProvider.sendMail(
			email, 
			'Recuperação de senha', 
			`O link para reset é ${token}`
		)
	}
}
export { SendForgotPasswordMailUseCase }

