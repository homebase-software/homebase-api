interface FullLocation extends LocationDetails {
	id: number
}

interface LocationDetails {
	parentId: number
	name: string
	description: string
	isActive: boolean
}

export { FullLocation, LocationDetails }