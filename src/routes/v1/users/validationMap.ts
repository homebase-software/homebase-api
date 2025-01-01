import { body, param, ValidationChain } from "express-validator"
import { FullUser } from "./interfaces"
import { prisma } from "@/src/prisma-client"

type FullUserValidationMaps = {
	[key in keyof FullUser]: ValidationChain
}

const validationMaps: FullUserValidationMaps = {
	id: param("id").notEmpty().isNumeric(),
	email: body("email").notEmpty().isEmail().normalizeEmail(),
	firstName: body("firstName").notEmpty().isString(),
	lastName: body("lastName").isString(),
	isActive: body("isActive").notEmpty().isBoolean(),
	password: body("password").notEmpty()
}

export { validationMaps }