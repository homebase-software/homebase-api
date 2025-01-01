import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export function validationHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('hello from validationErrors')
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).json(validationErrors)
		return
	}

	next()
}
