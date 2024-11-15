import express from "express";
import passport from "passport";
import * as controllers from "../../controllers";
import axios from "axios";
import { oauth2Client } from "../../config/passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post(
    "/login",
    controllers.loginController
    /*
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'lehoangtrong1@gmail.com'
                        },
                        password: {
                            type: 'string',
                            example: 'lehoangtrong'
                        }
                    },
                    required: ['email', 'password']
                }
            }
        }
    }
    #swagger.description = 'Authenticate a user using their email and password.'
    #swagger.summary = 'Login to the system'
    */
);

router.post(
    "/register",
    controllers.registerController
    /*
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'lehoangtrong1@gmail.com'
                        },
                        password: {
                            type: 'string',
                            example: 'lehoangtrong'
                        },
                        name: {
                            type: 'string',
                            example: 'Le Hoang Trong'
                        }
                    },
                    required: ['email', 'password', 'name']
                }
            }
        }
    }
    #swagger.description = 'Register a new customer.'
    #swagger.summary = 'Register a new customer'
    */
);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "profile",
            "email",
            "https://www.googleapis.com/auth/user.birthday.read",
            "https://www.googleapis.com/auth/user.phonenumbers.read",
            "https://www.googleapis.com/auth/calendar",
        ],
    })
    /*
    #swagger.description = 'Redirect to Google login page.'
    #swagger.summary = 'Redirect to Google login'
    */
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    async (req, res) => {
        const token = req.user?.token;
        const email = req.user?.emails[0].value;
        if (token && email)
            res.redirect(
                process.env.CLIENT_URL +
                    `/api/v1/auth/google/callback?token=${req.user?.response.accessToken}`
            );
        else res.redirect(process.env.CLIENT_URL + `/login`);
    }
    /*
    #swagger.description = 'Redirect to the client login success page.'
    #swagger.summary = 'Redirect to the client login success page'
     */
);

module.exports = router;
