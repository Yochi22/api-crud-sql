import { Router } from "express";
import {getCategories, postCategories, putCategories, deleteCategories, getCategory} from '../controllers/categories.controllers.js'


const router = Router()

router.get('/categories', getCategories)
router.get('/categories/:id', getCategory)


router.post('/categories', postCategories )

router.patch('/categories/:id', putCategories)

router.delete('/categories/:id', deleteCategories)

export default router