import mongoose from "mongoose";
import express from 'express'
import { User_Model, Message_Model, Convo_Model } from "../Models/UserModel.js";
import { Router } from "express";
import { getOtherUser, Login, Logout, Regsiter } from "../Controls/UserControl.js";
import { isAuth } from "../Middlewares/Auth.js";

const router = express.Router();

router.route('/register').post(Regsiter);
router.route('/login').post(Login);
router.route('/logout').get(Logout);
router.route('/getOtherUsers').get(isAuth,getOtherUser);


export default router;