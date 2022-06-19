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

}
export { UsersTokensRepository }
