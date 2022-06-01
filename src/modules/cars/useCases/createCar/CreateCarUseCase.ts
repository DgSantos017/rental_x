import { AppError } from '../../../../shared/erros/Apperror'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'

interface IRequest {
	name: string
	description: string
	daily_rate: number
	license_plate: string
	fine_amount: number
	brand: string
	category_id: string
}

// @injectable()
class CreateCarUseCase {

	constructor(
		// @inject('CarsRepository')
		private carsRepository: ICarsRepository
	) {}

	async execute({
		name, 
		description, 
		license_plate, 
		fine_amount, 
		daily_rate, 
		category_id,
		brand
	}:IRequest):Promise<Car> {

		const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

		if(carAlreadyExists){
			throw new AppError('Car already exists')
		}

		const car = await	this.carsRepository.create({
			name, 
			description, 
			license_plate, 
			fine_amount, 
			daily_rate, 
			category_id,
			brand
		})

		return car
	}
}
export { CreateCarUseCase }
