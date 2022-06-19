import { AppError } from '../../../../shared/erros/Apperror'
import { CategoriesRepositoryInMemory } from '../../repositories/implementationsTests/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategoryUseCase: CreateCategoryUseCase

beforeEach(() => {
	categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
	createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
}) 

describe('Create category', () => {
	it('should be able a new category', async () => {
		const category  = {
			name: 'Category Test',
			description: 'Description Test'
		}

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description
		})
		
		const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
		expect(categoryCreated).toHaveProperty('id')
	})

	it('should not be able a new category with name exists', async () => {

		const category  = {
			name: 'Category Test',
			description: 'Description Test'
		}

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description
		})

		expect(
			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description
			})
		).rejects.toEqual(new AppError('Category already exists', 409))
	})
})