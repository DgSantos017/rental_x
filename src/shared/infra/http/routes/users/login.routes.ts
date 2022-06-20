import { Router } from 'express'
import { LoginUserController } from '../../../../../modules/users/useCases/LoginUser/LoginUserController'
import { SendForgotPasswordMailController } from '../../../../../modules/users/useCases/sendForgotPasswordMail/sendForgotPasswordMailController'

const loginRoutes = Router()

const loginUserController = new LoginUserController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()

loginRoutes.post('/', loginUserController.handle)
loginRoutes.post('/forgot', sendForgotPasswordMailController.handle)


export { loginRoutes }
