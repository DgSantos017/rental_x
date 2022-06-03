import { CarsRepositoryInMemory } from '../../repositories/implementationsTests/CarsRepositoryInMemory'
import { ListCarsUseCase } from './ListCarsUseCase'

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
	})

	it('should be able to list all available cars', async () => {

		const car = await carsRepositoryInMemory.create({
			'name': 'Audi', 
			'description': 'car massa top', 
			'license_plate': 'XXXXX', 
			'fine_amount': 101, 
			'daily_rate': 203, 
			'brand': 'marca massa',
			'category_id': '2ad550ed-cc94-4fb5-98c0-7ee2c76959aa'
		})

		const cars = await listCarsUseCase.execute({})

		expect(cars).toEqual([car])
	})

	it('should be able to list all available cars by name', async () => {
		const car = await carsRepositoryInMemory.create({
			'name': 'Audi 2', 
			'description': 'car massa top', 
			'license_plate': 'XXXXX', 
			'fine_amount': 101, 
			'daily_rate': 203, 
			'brand': 'CarBrand_test',
			'category_id': '2ad550ed-cc94-4fb5-98c0-7ee2c76959aa'
		})

		const cars = await listCarsUseCase.execute({
			brand: 'CarBrand_test'
		})

		expect(cars).toEqual([car])
	})

})