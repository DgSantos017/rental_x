import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import createConnection from '../../../../shared/infra/typeorm'

let connection: Connection

describe('Create categoryController', () => {

	beforeAll( async() => {

		connection = await createConnection()
		await connection.runMigrations()

		const password = await hash('admin', 8)
		const id = uuid()

		await connection.query(
			`
			INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
			values('${id}', 'admin', 'admin@gmail', '${password}', true, 'now()', 'XXX')
    `
		)
		
	})

	afterAll( async() => {
		await connection.dropDatabase()
		await connection.close()
	})

	it('should be able to create a new category', async () => {

		const responseToken = await request(app).post('/login')
			.send({
				email: 'admin@gmail',
				password: 'admin'
			})

		const { refresh_token } = responseToken.body
	
		const response = await request(app).post('/categories')
			.send({
				'name': 'Name Category super test',
				'description': 'Description Category super test'
			}).set({
				Authorization: `Bearer ${refresh_token}`
			})
		expect(response.status).toBe(201)
	})

	it('should not be able to create a new category with name exists ', async () => {

		const responseToken = await request(app).post('/login')
			.send({
				email: 'admin@gmail',
				password: 'admin'
			})

		const { refresh_token } = responseToken.body
	
		const response = await request(app).post('/categories')
			.send({
				'name': 'Name Category super test',
				'description': 'Description Category super test'
			}).set({
				Authorization: `Bearer ${refresh_token}`
			})
		expect(response.status).toBe(409)
	})
  
})