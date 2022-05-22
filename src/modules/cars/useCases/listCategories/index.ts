import { ListCategoriesUseCase } from './listCategoriesUseCase'
import { ListCategoriesController } from './listCategoryController'

const categoriesRepository = null
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController =  new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }
