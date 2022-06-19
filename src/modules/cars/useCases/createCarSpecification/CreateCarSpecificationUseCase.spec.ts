import { AppError } from '../../../../shared/erros/Apperror'
import { CarsRepositoryInMemory } from '../../repositories/implementationsTests/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '../../repositories/implementationsTests/SpecificationsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('create Car specification', () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
	})

	it('should not be able to add a new specification to a now-existent the car', async () => {

		const car_id = '1234'
		const specifications_id = ['54321']

		await expect(
			createCarSpecificationUseCase.execute({
				car_id, specifications_id
			})

		).rejects.toEqual(new AppError('Car does not exists', 404))
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

		const specification  = await specificationsRepositoryInMemory.create({
			description: 'test',
			name: 'test'
		})

		const specifications_id = [specification.id]

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id, 
			specifications_id
		})

		expect(specificationsCars).toHaveProperty('specifications')
		expect(specificationsCars.specifications.length).toBe(1)
	})

})