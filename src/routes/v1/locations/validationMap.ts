import { body, param, ValidationChain } from "express-validator"
import { FullLocation } from "./interfaces"

type FullLocationValidationMaps = {
	[key in keyof FullLocation]: ValidationChain
}

const validationMaps: FullLocationValidationMaps = {
	id: param("id").notEmpty().isNumeric(),
	parentId: body("parentId").optional().isNumeric(),
	name: body("name").notEmpty().isString(),
	isActive: body("isActive").notEmpty().isBoolean(),
	description: body("description").isString()
}

export { validationMaps }