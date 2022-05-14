import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'


const specificationsRepository = new SpecificationsRepository()

const specificationsRoutes = Router()

specificationsRoutes.post('/', (req, res) => {

	const { name, description } = req.body

	const createSpecificationService = new CreateSpecificationService(specificationsRepository)
	createSpecificationService.execute({ name, description })

	return res.status(201).send()

})

specificationsRoutes.get('/', (req, res) => {
	const specifications = specificationsRepository.list()
	return res.status(200).json(specifications)
})

export { specificationsRoutes }
