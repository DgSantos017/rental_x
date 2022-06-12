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
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { IDateProvider } from './providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from './providers/DateProvider/implementations/DayjsDateProvider'

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