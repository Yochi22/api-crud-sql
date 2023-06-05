import { Router } from "express";
import {getElements, getElement, postElements, putElements, deleteElements} from '../controllers/elements.controller.js'


const router = Router()

router.get('/categories/:id/elements/:id', getElements)
router.get('/elements/:id', getElement)
router.patch('/elements/:id', putElements)
router.post('/categories/:id/elements', postElements )
router.delete('/elements/:id', deleteElements)

export default router