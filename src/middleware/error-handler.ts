import { NextFunction, Request, Response } from "express"
import { getErrorMessage } from "@/util/get-error-message"


export function errorHandler(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (res.headersSent) {
		next(error)
		return
	}

	res.status(500).json({
		error: {
			message: getErrorMessage(error)
		}
	})
}