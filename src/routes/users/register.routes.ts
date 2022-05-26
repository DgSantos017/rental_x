import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../config/upload'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'
import { CreateUserController } from '../../modules/users/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController'

const registerUserRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

registerUserRoutes.post('/', createUserController.handle)

registerUserRoutes.patch(
	'/avatar', 
	ensureAuthenticated,
	uploadAvatar.single('avatar'), 
	updateUserAvatarController.handle
)

export { registerUserRoutes }
