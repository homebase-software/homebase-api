import { body, param, ValidationChain } from 'express-validator'
import { LocationFields } from './interfaces'

type LocationValidationMaps = {
	[key in keyof LocationFields]: ValidationChain
}

const validationMaps: LocationValidationMaps = {
	id: param('id')
		.notEmpty()
		.withMessage('id is required')
		.isNumeric()
		.withMessage('id must be numeric'),
	parentId: body('parentId')
		.optional()
		.isNumeric()
		.withMessage('parentId must be numeric'),
	name: body('name')
		.notEmpty()
		.withMessage('name is required')
		.isString()
		.withMessage('name must be a string'),
	isActive: body('isActive')
		.notEmpty()
		.withMessage('isActive is required')
		.isBoolean()
		.withMessage('isActive must be a boolean'),
	description: body('description')
		.isString()
		.withMessage('description must be a message'),
}

export { validationMaps }
