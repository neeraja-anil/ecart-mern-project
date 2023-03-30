import express from "express";
import { authUser, getUserProfile, registerNewUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/', registerNewUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router