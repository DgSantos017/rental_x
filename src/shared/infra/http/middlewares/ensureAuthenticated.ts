import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '../../../../config/auth'
import { UsersTokensRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersTokensRepository'
import { AppError } from '../../../erros/Apperror'

interface IPayLoad {
  sub: string
}

export async function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {

	const authHeader = req.headers.authorization
	const usersTokenRepository = new UsersTokensRepository()

	if(!authHeader){
		throw new AppError('Token missing', 401)
	}

	const [, token] = authHeader.split(' ')

	try {
		const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayLoad

		const user = await usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)

		if(!user){
			throw new AppError('User does not exists', 404)
		}

		req.user = { 
			id: user_id
		}
    
		next()
	
	} catch {
		throw new AppError('Invalid Token', 401)
	}
}