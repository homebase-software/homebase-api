import { Router, Request, Response } from 'express'
import { prisma } from '@/prisma-client'
import { FullUser, UserFields } from './interfaces'
import { validationResult } from 'express-validator'
import { validationMaps } from './validationMap'

const router = Router()

router.post('/', [
	validationMaps.email,
	validationMaps.firstName,
	validationMaps.lastName,
	validationMaps.isActive
], async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).json(validationErrors)
		return
	}

	const { email, firstName, lastName, isActive, password } = req.body as FullUser

	const newUser = await prisma.user.create({
		data: {
			email: email,
			firstName: firstName,
			lastName: lastName,
			isActive: isActive,
			password: password
		},
	})

	if (!newUser) {
		throw new Error("failed to create user")
	}

	res.status(201).json({
		id: newUser.id,
		email: newUser.email,
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		isActive: newUser.isActive,
		createdAt: newUser.createdAt
	})
})

router.put("/:id", [
	validationMaps.id,
	validationMaps.email,
	validationMaps.firstName,
	validationMaps.lastName,
	validationMaps.isActive
], async (req: Request, res: Response) => {
	const id = parseInt(req.params.id)
	const { email, firstName, lastName, isActive } = req.body as UserFields

	const user = await prisma.user.findFirst({ where: { id: id } })
	if (!user) {
		res.status(404).json(`user with id of "${id}" not found`)
		return
	}

	const result = await prisma.user.update({
		where: { id: id },
		data: {
			email: email,
			firstName: firstName,
			lastName: lastName ?? null,
			isActive: isActive
		}
	})

	res.status(200).json({
		id,
		email,
		firstName,
		lastName,
		isActive
	})
})

router.delete("/:id", [
	validationMaps.id
], async (req: Request, res: Response) => {
	const id = parseInt(req.params.id)
	const errors: string[] = []

	if (!id) errors.push("id is required")
	else if (isNaN(id)) errors.push("id must be an integer")
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	const result = await prisma.user.delete({ where: { id: id } })

	res.status(200).json(result)
})

router.get('/', async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({ select: { id: true, email: true, firstName: true, lastName: true, isActive: true } })
	const status = users.length > 0 ? 200 : 204

	res.status(status).json(users)
})

export { router }
