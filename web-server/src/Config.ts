import fs from "fs";

const config = JSON.parse(fs.readFileSync(`${process.cwd()}/config.json`, "utf-8"));
const valid = validateConfig(config);
if (valid.length > 0)
	throw new Error(`Invalid config.json: ${valid.join(", ")}`);

export default config as Config.Schema;

function validateConfig(schema: any): string[] {
	const errors: string[] = [];

	if (!Array.isArray(schema.cameraGroups))
		errors.push("cameraGroups should be an array");

	schema.cameraGroups?.forEach((group: any, groupIndex: number) => {
		if (typeof group.label !== "string")
			errors.push(`cameraGroups[${groupIndex}].label should be a string`);

		if (!Array.isArray(group.cameras))
			errors.push(`cameraGroups[${groupIndex}].cameras should be an array`);

		group.cameras?.forEach((camera: any, cameraIndex: number) => {
			if (typeof camera.label !== "string")
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].label should be a string`);

			if (typeof camera.identifier !== "string")
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].identifier should be a string`);

			if (typeof camera.host !== "string")
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].host should be a string`);

			if (typeof camera.port !== "number")
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].port should be a number`);

			if (typeof camera.channel !== "number")
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].channel should be a number`);

			if (typeof camera.stream !== "object" || camera.stream === null)
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].stream should be an object`);

			if (camera.stream) {
				if (typeof camera.stream.preview !== "string")
					errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].stream.preview should be a string`);

				if (typeof camera.stream.full !== "string")
					errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].stream.full should be a string`);
			}

			if (typeof camera.credentials !== "object" || camera.credentials === null)
				errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].credentials should be an object`);

			if (camera.credentials) {
				if (typeof camera.credentials.username !== "string")
					errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].credentials.username should be a string`);

				if (typeof camera.credentials.password !== "string")
					errors.push(`cameraGroups[${groupIndex}].cameras[${cameraIndex}].credentials.password should be a string`);
			}
		});
	});

	return errors;
}
