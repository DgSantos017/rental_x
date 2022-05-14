import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesUseCase } from './listCategoriesUseCase'
import { ListCategoriesController } from './listCategoryController'

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController =  new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }
