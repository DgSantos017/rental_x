import { Router } from 'express'
import { RefreshTokenController } from '../../../../../modules/users/useCases/refreshToken/RefreshTokenController'

const refreshTokenRoutes = Router()

const refreshTokenController = new RefreshTokenController()

refreshTokenRoutes.post('/', refreshTokenController.handle)

export { refreshTokenRoutes }
