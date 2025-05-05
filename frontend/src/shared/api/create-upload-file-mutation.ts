import { obj, str } from "@withease/contracts"
import { createApiMutation } from "./createApiMutation"

export const createUploadFileMutation = () =>
	createApiMutation({
		request: (file: File) => {
			const formData = new FormData()

			formData.append("file", file)

			return {
				method: "POST",
				url: "/api/file",
				body: formData,
			}
		},
		response: {
			contract: obj({
				path: str,
			}),
		},
	})
