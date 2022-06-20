import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/erros/Apperror'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {

	constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

		@inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	){}

	async execute({ token, password }: IRequest): Promise<void>{

		const userToken = await this.usersTokensRepository.findByRefreshToken(token)

		if(!userToken){
			throw new AppError('Token does not exists', 404)
		}

		if(this.dateProvider.compareIfBefore(
			userToken.espires_date, this.dateProvider.dateNow()
		)){
			throw new AppError('Token expired', 401)
		}

		const user = await this.usersRepository.findById(userToken.user_id)
		user.password = await hash(password, 8)

		await this.usersRepository.create(user)
		await this.usersTokensRepository.deleteById(userToken.id)

	}
}
export { ResetPasswordUserUseCase }
