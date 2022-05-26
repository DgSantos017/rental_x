import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { LoginUserUseCase } from './LoginUserUseCase'

class LoginUserController {

	async handle(req: Request, res: Response): Promise<Response> {

		const { email, password } = req.body
		const loginUserUseCase = container.resolve(LoginUserUseCase)

		const token = await loginUserUseCase.execute({
			email, password
		})
		return res.json(token)
	}
}
export { LoginUserController }
