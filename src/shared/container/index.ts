import { container } from 'tsyringe'
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UsersRepository'
import { UsersTokensRepository } from '../../modules/users/infra/typeorm/repositories/UsersTokensRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../modules/users/repositories/IUsersTokensRepository'
import { IDateProvider } from './providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from './providers/DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './providers/MailProvaider/IMailProvider'
import { EtherealMailProvider } from './providers/MailProvaider/implementations/EtherealMailProvider'

container.registerSingleton<IDateProvider> (
	'DayjsDateProvider',
	DayjsDateProvider
)

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
	'SpecificationsRepository',
	SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)

container.registerSingleton<ICarsRepository>(
	'CarsRepository',
	CarsRepository
)
container.registerSingleton<ICarsImagesRepository>(
	'CarsImagesRepository',
	CarsImagesRepository
)
container.registerSingleton<IRentalsRepository>(
	'RentalsRepository',
	RentalsRepository
)
container.registerSingleton<IDateProvider> (
	'DayJsDateProvider',
	DayjsDateProvider
)
container.registerSingleton<IUsersTokensRepository> (
	'UsersTokensRepository',
	UsersTokensRepository
)

container.registerInstance<IMailProvider>(
	'EtherealMailProvider',
	new EtherealMailProvider()
)