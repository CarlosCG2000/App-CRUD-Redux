import { Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useUserActions } from "../hooks/useUserActions.ts"
import { useState } from "react"

export function CreateNewUser() {

	const { addUser } = useUserActions()
	const [result, setResult] = useState<"ok" | "ko" | null>(null) // para mostrar un mensaje de éxito o error, creamos un estado local

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault() // para evitar el refresco de la página

		setResult(null) // para que no se muestre el mensaje de éxito o error

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const name = formData.get("name") as string
		const email = formData.get("email") as string
		const github = formData.get("github") as string

		// Validaciones
		if (!name || !email || !github)
			return setResult("ko") // validaciones que tu quieras
		setResult("ok")

		addUser({ name, email, github })
		form.reset()
	}

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title style={{ marginBottom: "16px" }}>Create New User</Title>
			{/*onSubmit={handleSubmit}*/}
			<form onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="Aquí el nombre" />
				<TextInput name="email" placeholder="Aquí el email" />
				<TextInput name="github" placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" style={{ marginTop: "16px", marginRight: "20px", }}>
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge color='green'>Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color='red'>Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	)
}
