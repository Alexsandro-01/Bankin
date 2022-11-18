import {Router} from 'express'
import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import UserModel from '../models/UserModel'

const model = new UserModel()

const service = new UserService(model)

const controller = new UserController(service);

const userRoute = Router()

userRoute.post('/create', controller.create);

export default userRoute;