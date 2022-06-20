import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvaider/in-memory/MailProviderInMemory'
import { AppError } from '../../../../shared/erros/Apperror'
import { UsersRepositoryInMemory } from '../../repositories/implementationsTests/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/implementationsTests/UsersTokensRepositoryInMemory'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send forgot Mail', () => {

	beforeEach(() => {

		usersRepositoryInMemory = new UsersRepositoryInMemory()
		dateProvider = new DayjsDateProvider()
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
		mailProvider = new MailProviderInMemory()

		sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider,
			mailProvider
		)
	})

	it('should be able to send a forgot password mail to user', async () => {

		const sendMail = jest.spyOn(mailProvider, 'sendMail')
    
		await usersRepositoryInMemory.create({
			driver_license: 'xxx-xxx8',
			email: 'dio78@gamil.com',
			name: 'Diogo ferreira',
			password: '1234'
		})

		await sendForgotPasswordMailUseCase.execute('dio78@gamil.com')

		expect(sendMail).toHaveBeenCalled()
	})

	it('should not be able to send an email if user does not exists', async() => {

		await expect(
			sendForgotPasswordMailUseCase.execute('diogoinexistente@gmail.com')
		).rejects.toEqual(new AppError('User does not exists', 404))

	})

	it('should be able to create a new users token', async () => {

		const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')

		usersRepositoryInMemory.create({
			driver_license: 'yyy-xxx8',
			email: 'dg178@gamil.com',
			name: 'Diogo santos',
			password: '1234'
		})

		await sendForgotPasswordMailUseCase.execute('dg178@gamil.com')

		expect(generateTokenMail).toBeCalled()

	})
})