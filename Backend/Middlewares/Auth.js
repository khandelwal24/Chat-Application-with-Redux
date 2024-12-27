import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

export const isAuth = async(req,res,next) =>{
    try{ 
        const token = req.cookies.CookieToken;
        // console.log("Cookie Wala Token : ",token);
        if(!token) return res.status(401).json({message:'Token nhi mila Please Login, User not Authenticated',success:false});
        const decode = await jwt.verify(token,process.env.jwt_Secret);
        if(!decode) return res.status(400).json({message:'Invalid Token',success:false});
        // console.log('Decode ki value',decode);
        req.id = decode.userId; // payload se aa rha hai.. jo login ke time bheje the..
        next();
    }
    catch(error){
        console.log('Error Occured',error);
        res.status(400).json({message:'Error Occured',success:false});
    }
}