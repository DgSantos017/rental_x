import { Router } from 'express'
import { LoginUserController } from '../../../../../modules/users/useCases/LoginUser/LoginUserController'
import { ResetPasswordUserController } from '../../../../../modules/users/useCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from '../../../../../modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const loginRoutes = Router()

const loginUserController = new LoginUserController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

loginRoutes.post('/', loginUserController.handle)
loginRoutes.post('/forgot', sendForgotPasswordMailController.handle)
loginRoutes.post('/password-reset', resetPasswordUserController.handle)


export { loginRoutes }
