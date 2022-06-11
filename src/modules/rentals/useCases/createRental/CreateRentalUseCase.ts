import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/erros/Apperror'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expect_return_date: Date
}

class CreateRentalUseCase {

	constructor(
    private rentalsRepository: IRentalsRepository,
		private dateProvider: IDateProvider
	){}
  
	async execute({user_id, car_id, expect_return_date}: IRequest): Promise<Rental> {

		const minimumHour = 24
    
		const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
		if(carUnAvailable){
			throw new AppError('Car is unavailable')
		}

		const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
		if(rentalOpenToUser){
			throw new AppError('There\'s a rental in progress for user')
		}

		const dateNow = this.dateProvider.dateNow()

		const compare = this.dateProvider.compareInHours(dateNow, expect_return_date)

		if(compare < minimumHour){
			throw new AppError('invalid return time') 
		}

		const rental = await this.rentalsRepository.create({
			user_id, car_id, expect_return_date
		})

		return rental
	}
}
export { CreateRentalUseCase }

