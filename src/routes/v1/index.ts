import express from 'express'
import { router as LocationRoutes } from './locations'
import { router as UserRoutes } from './users/routes'
import { router as AuthRoutes } from './auth/routes'

const v1 = express.Router()

v1.use('/locations', LocationRoutes)
v1.use('/users', UserRoutes)
v1.use('/auth', AuthRoutes)

export default v1
