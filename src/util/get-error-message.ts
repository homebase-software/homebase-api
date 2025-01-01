import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

enum PrismaErrorCodes {
	P2002 = "P2002"
}

type PrismaErrorMessage = {
	[key in PrismaErrorCodes]: string
}

const PrismaErrorMessages: PrismaErrorMessage = {
	P2002: "must be unique"
}

export function getErrorMessage(error: unknown): string {
	if (error instanceof PrismaClientKnownRequestError) {
		let message = error.message
		if (error.meta?.cause !== undefined) message = String(error.meta.cause)
		if (error.meta?.target !== undefined) message = `${error.meta.target} ${PrismaErrorMessages[error.code as PrismaErrorCodes]}`
		return message
	}
	if (error instanceof Error) {
		return error.message
	}
	if (error && typeof error === "object" && "message" in error) {
		return String(error.message)
	}
	if (typeof error === "string") {
		return error
	}

	return "An unhandled server error occured. Please open an issue with as much detail as possible here: https://github.com/homebase-software/homebase-api/issues"
}