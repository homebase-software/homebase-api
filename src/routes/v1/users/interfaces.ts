interface User extends UserFields {
	id: number
}

interface UserFields {
	email: string
	firstName: string
	lastName: string
	isActive: boolean
	password: string
}

export { User as FullUser, UserFields }