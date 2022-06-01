import { CarsRepositoryInMemory } from '../../repositories/implementationsTests/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
	})

	it('should be able to create a new car', async () => {
		await createCarUseCase.execute({
			name: 'name', 
			description: 'descriion', 
			license_plate: 'plate', 
			fine_amount: 138, 
			daily_rate: 8, 
			category_id: 'category',
			brand: 'brand'
		})
	})
})