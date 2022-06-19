import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/erros/Apperror'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'


interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string
	refresh_token: string
}

@injectable()
class LoginUserUseCase {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

		@inject('UsersTokensRepository')
		private usersTokensReporitory: IUsersTokensRepository,

		@inject('DayJsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute({email, password}: IRequest): Promise<IResponse>{

		const user = await this.usersRepository.findByEmail(email)

		if(!user){
			throw new AppError('E-Mail or password incorrect', 401)
		}

		const passwordMatch = await compare(password, user.password)
		
		if(!passwordMatch){
			throw new AppError('E-Mail or password incorrect', 401)
		}

		const { 
			expires_in_token, 
			secret_refresh_token, 
			secret_token, 
			expires_in_refresh_token,
			expires_refresh_token_days
		} = auth

		const token = sign({}, secret_token, {
			subject: user.id,
			expiresIn: expires_in_token
		})

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: user.id,
			expiresIn: expires_in_refresh_token
		})

		const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

		await this.usersTokensReporitory.create({
			user_id: user.id,
			refresh_token,
			espires_date: refresh_token_expires_date
		})
		
		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			},
			refresh_token
		}

		return tokenReturn
	}
}

export { LoginUserUseCase }

