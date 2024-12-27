import express from 'express'
import mongoose from 'mongoose'
import { Router } from 'express'
import 'dotenv/config'
import path from 'path'
import { getAllMesages, sendMessage } from '../Controls/UserControl.js'
import { isAuth } from '../Middlewares/Auth.js'

const router = express.Router();

router.route('/send/:id').post(isAuth,sendMessage)
router.route('/getAllMessage/:id').get(isAuth,getAllMesages)

export default router;