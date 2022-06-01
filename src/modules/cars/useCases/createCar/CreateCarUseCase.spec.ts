import { AppError } from '../../../../shared/erros/Apperror'
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
		const car = await createCarUseCase.execute({
			name: 'name', 
			description: 'descriion', 
			license_plate: 'plate', 
			fine_amount: 138, 
			daily_rate: 8, 
			category_id: 'category',
			brand: 'brand'
		})
		expect(car).toHaveProperty('id')
	})

	it('should not be able to create a car with exists license plate', () => {
		expect( async() => {
			await createCarUseCase.execute({
				name: 'Car 1', 
				description: 'descriion', 
				license_plate: 'plate', 
				fine_amount: 138, 
				daily_rate: 8, 
				category_id: 'category',
				brand: 'brand'
			})
			await createCarUseCase.execute({
				name: 'Car 2', 
				description: 'descriion', 
				license_plate: 'plate', 
				fine_amount: 138, 
				daily_rate: 8, 
				category_id: 'category',
				brand: 'brand'
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create a car with available true by default', async () => {
		expect( async() => {
			const car = await createCarUseCase.execute({
				name: 'Car Avalilable', 
				description: 'descriion', 
				license_plate: 'plate ABC', 
				fine_amount: 138, 
				daily_rate: 8, 
				category_id: 'category',
				brand: 'brand'
			})
			
			expect(car.available).toBe(true)

		})
	})
})