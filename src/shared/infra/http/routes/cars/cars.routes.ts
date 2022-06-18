import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../../config/upload'
import { CreateCarController } from '../../../../../modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '../../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImageController } from '../../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController'
import { ensureAdmin } from '../../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarsController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImage = new UploadCarImageController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarsController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post(
	'/images/:id', 
	ensureAuthenticated, 
	ensureAdmin, 
	upload.array('images'),
	uploadCarImage.handle
)

carsRoutes.get('/available', listAvailableCarsController.handle)

export { carsRoutes }
