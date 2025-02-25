import { Router } from "express";

import {postSignup, getUser, updateUser} from '../Controllers/userController.js'

const router = Router()

router.get('/:email', getUser)
router.post('/', postSignup)
router.patch('/:email',updateUser)


export default router