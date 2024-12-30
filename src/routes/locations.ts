import { Router, Request, Response } from 'express'
import { prisma } from '@/prisma-client'

export interface Location {
	id?: number
	parentId?: number
	name?: string
	description?: string
	isActive?: boolean
}

const router = Router()

router.post('/add', async (req: Request, res: Response) => {
	const { name, isActive, parentId, description } = req.body as Location
	const errors: string[] = []

	if (!name) errors.push('name is required')
	if (!isActive) errors.push('isActive is required')
	if (parentId) {
		const parentLocationCount = await prisma.location.count({where: {id: parentId}})
		if (parentLocationCount === 0) {
			errors.push("parent location doesn't exist")
		}
	}
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	try {
		const result = await prisma.location.create({
			data: {
				name: name!,
				parentId: parentId,
				description: description,
				isActive: isActive!,
			},
		})

		res.status(200).json(result)
		return
	} catch (ex) {
		console.log(ex)
		res.status(500).json("Oops! Something went wrong. That's our bad.")
		return
	}
})

router.delete('/:id', async (req: Request, res: Response) => {
	const id = +req.params.id
	const errors: string[] = []

	if (!id) errors.push('id is required')
	
	if (errors.length > 0) {
		res.status(400).json({ errors })
		return
	}

	try {
		const result = await prisma.location.delete({ where: { id: (id as number) } })

		res.status(200).json(result)
		return
	} catch (ex) {
		console.log(ex)
		res.status(500).json("Oops! Something went wrong. That's our bad.")
		return
	}
})

router.get('/list', async (req: Request, res: Response) => {
	const locations = await prisma.location.findMany()
	
	res.status(200).json(locations)
})

export { router }
