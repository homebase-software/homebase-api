import { Router, Request, Response } from 'express'
import { prisma } from '@/prisma-client'
import { validationResult } from 'express-validator'
import { validationMaps } from './validationMap'
import { FullLocation, LocationDetails } from './interfaces'

const router = Router()

router.post('/', [
	validationMaps.description,
	validationMaps.isActive,
	validationMaps.name,
	validationMaps.parentId
], async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).json(validationErrors)
		return
	}

	const { name, isActive, parentId, description } = req.body as FullLocation

	const result = await prisma.location.create({
		data: {
			name: name!,
			parentId: parentId,
			description: description,
			isActive: isActive!,
		},
	})

	res.status(201).json(result)
	return
})

router.put('/:id', [
	...Object.values(validationMaps)
], async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).json(validationErrors)
		return
	}

	const id = parseInt(req.params.id)
	const { parentId, name, description, isActive } = req.body as LocationDetails

	const result = await prisma.location.update({
		where: { id: id },
		data: {
			parentId: parentId ?? null,
			name: name,
			description: description ?? null,
			isActive: isActive
		}
	})

	res.status(200).json(result)
})

router.delete('/:id', [
	validationMaps.id
], async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).json(validationErrors)
		return
	}

	const id = parseInt(req.params.id)

	const result = await prisma.location.delete({ where: { id: (id as number) } })

	res.status(200).json(result)

})

router.get('/', async (req: Request, res: Response) => {
	const locations = await prisma.location.findMany()

	res.status(200).json(locations)
})

export { router }
