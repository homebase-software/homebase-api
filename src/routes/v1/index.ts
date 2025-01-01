import express from "express"
import { router as LocationRoutes } from "./locations"
import { router as UserRoutes } from "./users/routes"

const v1 = express.Router()

v1.use('/locations', LocationRoutes)
v1.use('/users', UserRoutes)

export default v1