import { Router } from "express";
import {getElements, getElement, postElements, putElements, deleteElements} from '../controllers/elements.controller.js'


const router = Router()

router.get('/elements/categories/:id', getElements)
router.get('/categories/:id/elements/:id', getElement)
router.patch('/categories/:id/elements/:id', putElements)
router.post('/categories/:id/elements', postElements )
router.delete('/categories/:id/elements/:id', deleteElements)

export default router