import { Router, Request, Response } from 'express'
import { prisma } from '@/prisma-client'

export interface User {
	id?: number
	email?: string
	firstName?: string
	lastName?: string
}

const router = Router()

router.post('/new', async (req: Request, res: Response) => {
	const newUserData = req.body as User
	const errors: string[] = []

	if (!newUserData.email) errors.push('email is required')
	if (!newUserData.firstName) errors.push('first name is required')
	if (await prisma.user.findFirst({ where: { email: newUserData.email } }))
		errors.push('a user with that email already exists.')
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	try {
		const result = await prisma.user.create({
			data: {
				email: newUserData.email!,
				firstName: newUserData.firstName!,
				lastName: newUserData.lastName,
			},
		})

		res.status(200).json(result)
		return
	} catch (ex) {
		res.status(500).json("Oops! Something went wrong. That's our bad.")
		return
	}
})

router.get('/ping', (req: Request, res: Response) => {
	res.status(200).json('pong')
})

export { router }
