import { AppError } from '../../../../shared/erros/Apperror'
import { CarsRepositoryInMemory } from '../../repositories/implementationsTests/CarsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('create Car specification', () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory)
	})

	it('should not be able to add a new specification to a now-existent the car', async () => {

		expect(async() => {
			const car_id = '1234'
			const specifications_id = ['54321']
			await createCarSpecificationUseCase.execute({car_id, specifications_id})

		}).rejects.toBeInstanceOf(AppError)
	})

	it('should be able to add a new specification to the car', async () => {

		const car = await carsRepositoryInMemory.create({
			name: 'name', 
			description: 'descriion', 
			license_plate: 'plate', 
			fine_amount: 138, 
			daily_rate: 8, 
			category_id: 'category',
			brand: 'brand'
		})

		const specifications_id = ['54321']

		await createCarSpecificationUseCase.execute({
			car_id: car.id, 
			specifications_id})
	})

})