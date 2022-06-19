import { Router } from 'express'
import { carsRoutes } from './cars/cars.routes'
import { categoriesRoutes } from './cars/categories.routes'
import { specificationsRoutes } from './cars/specifications.routes'
import { rentalRoutes } from './rentals/rental.routes'
import { loginRoutes } from './users/login.routes'
import { refreshTokenRoutes } from './users/refreshToken.routes'
import { registerUserRoutes } from './users/register.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/register', registerUserRoutes)
router.use('/login', loginRoutes)
router.use('/refresh-token', refreshTokenRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)

export { router }
