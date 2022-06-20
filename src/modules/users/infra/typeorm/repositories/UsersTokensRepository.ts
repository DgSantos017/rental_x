import { getRepository, Repository } from 'typeorm'
import { ICreateUserTokensDTO } from '../../../dtos/ICreateUserTokensDTO'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { UserTokens } from '../entities/UserTokens'

class UsersTokensRepository implements IUsersTokensRepository {

	constructor() {
		this.repository = getRepository(UserTokens)
	}
	
	private repository: Repository<UserTokens>
  
	async create({ espires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {

		const userToken = this.repository.create({
			espires_date,
			refresh_token,
			user_id
		})

		await this.repository.save(userToken)

		return userToken
	}

	async findByUserIdAndRefreshToken(
		user_id: string, 
		refresh_token: string
	): Promise<UserTokens> {
		const usersTokens = await this.repository.findOne({ user_id, refresh_token })
		return usersTokens
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id)
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userToken = await this.repository.findOne({  refresh_token })
		return userToken
	}

}
export { UsersTokensRepository }
