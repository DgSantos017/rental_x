import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/Apperror'
import { UsersRepository } from '../modules/accounts/repositpries/implementations/UsersRepository'

interface IPayLoad {
  sub: string
}

export async function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {

	const authHeader = req.headers.authorization

	if(!authHeader){
		throw new AppError('Token missing', 401)
	}

	const [, token] = authHeader.split(' ')

	try {
		const { sub: user_id } = verify(token, '9ee8bd45aeb5e900dfeb0725a13ff086') as IPayLoad
		const usersRepository = new UsersRepository()

		const user = await usersRepository.findById(user_id)
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