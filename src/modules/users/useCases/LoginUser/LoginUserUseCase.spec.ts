import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '../../../../shared/erros/Apperror'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/implementationsTests/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/implementationsTests/UsersTokensRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { LoginUserUseCase } from './LoginUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let loginUserUseCase: LoginUserUseCase
let createUsersUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe('Login User', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory()
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
		dateProvider = new DayjsDateProvider()

		loginUserUseCase = new LoginUserUseCase(
			usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider
		)
		
		createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory)
	})

	it('should be able to login an user', async () => {
		const user: ICreateUserDTO = {
			driver_license: '007',
			email: 'dio@gmail.com',
			password: '1234',
			name: 'Diogo'
		}
		await createUsersUseCase.execute(user)
		const result = await loginUserUseCase.execute({
			email: user.email,
			password: user.password
		})
		expect(result).toHaveProperty('token')
	})

	it('should not be able to login an nonexistent user', async () => {

		await expect(
			loginUserUseCase.execute({
				email: 'false@gmail.com',
				password: '1234'
			})
		).rejects.toEqual(new AppError('E-Mail or password incorrect', 401))
	})

	it('should not be able to login with incorrect password', async () => {

		const user: ICreateUserDTO = {
			driver_license: '00778',
			email: 'teste@gmail.com',
			password: '1234',
			name: 'test error'
		}

		await createUsersUseCase.execute(user)

		await expect(
			loginUserUseCase.execute({
				email: user.email,
				password: 'passwordError'
			})
		).rejects.toEqual(new AppError('E-Mail or password incorrect', 401))
	})
})