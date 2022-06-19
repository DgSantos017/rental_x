import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/erros/Apperror'
import { IUsersRepository } from '../../repositories/IUsersRepository'


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
}

@injectable()
class LoginUserUseCase {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
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

		const token = sign({}, '9ee8bd45aeb5e900dfeb0725a13ff086', {
			subject: user.id,
			expiresIn: '1d'
		})

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		}

		return tokenReturn
	}
}

export { LoginUserUseCase }

