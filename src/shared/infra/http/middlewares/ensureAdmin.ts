import { NextFunction, Request, Response } from 'express'
import { UsersRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersRepository'
import { AppError } from '../../../erros/Apperror'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

	const { id } = req.user
	const usersRepository = new UsersRepository()

	const user = await usersRepository.findById(id)

	if(!user.isAdmin){
		throw new AppError('User isn\'t Admin')
	}

	return next()
  
}