import express from "express";
import { authUser, getUserProfile, registerNewUser, updateUserProfile, getUsers, deleteUsers } from "../controllers/userController.js";
import { protect, admin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerNewUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUsers)


export default router