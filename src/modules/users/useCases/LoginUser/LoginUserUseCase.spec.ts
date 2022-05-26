import { AppError } from '../../../../shared/erros/Apperror'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/implementationsTests/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { LoginUserUseCase } from './LoginUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let loginUserUseCase: LoginUserUseCase
let createUsersUseCase: CreateUserUseCase

describe('Login User', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory()
		loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory)
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

	it('should not be able to login an nonexistent user', () => {
		expect(async() => {
			await loginUserUseCase.execute({
				email: 'false@gmail.com',
				password: '1234'
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to login', () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				driver_license: '00778',
				email: 'teste@gmail.com',
				password: '1234',
				name: 'test error'
			}

			await createUsersUseCase.execute(user)
			await loginUserUseCase.execute({
				email: user.email,
				password: 'passwordError'
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})