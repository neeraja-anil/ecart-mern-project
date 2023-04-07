import express from "express";
import { authUser, getUserProfile, registerNewUser, updateUserProfile, getUsers, deleteUsers, getUserById, updateUser } from "../controllers/userController.js";
import { protect, admin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerNewUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUsers).get(protect, admin, getUserById).put(protect, admin, updateUser)


export default router