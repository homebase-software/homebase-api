import { Router, Request, Response } from 'express'
import { prisma } from '@/prisma-client'

export interface User {
	id?: number
	email?: string
	firstName?: string
	lastName?: string
}

const router = Router()

router.post('/add', async (req: Request, res: Response) => {
	const { email, firstName, lastName } = req.body as User
	const errors: string[] = []

	if (!email) errors.push('email is required')
	if (!firstName) errors.push('firstName is required')
	if (await prisma.user.findFirst({ where: { email: email } }))
		errors.push('a user with that email already exists.')
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	try {
		const result = await prisma.user.create({
			data: {
				email: email!,
				firstName: firstName!,
				lastName: lastName,
			},
		})

		res.status(200).json(result)
		return
	} catch (ex) {
		res.status(500).json("Oops! Something went wrong. That's our bad.")
		return
	}
})

router.delete("/delete", async (req: Request, res: Response) => {
	const { id } = req.body as User
	const errors: string[] = []

	if (!id) errors.push("id is required")
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	const result = await prisma.user.delete({ where: { id: id } })
	
	res.status(200).json(result)
})

router.get('/list', async (req: Request, res: Response) => {
	const users = await prisma.user.findMany()

	res.status(200).json(users)
})

export { router }
