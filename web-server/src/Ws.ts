import RtspRelay from "rtsp-relay";
import Config from "./Config";
import { Request, Response } from "express";
// import { Request, Response } from "express";


// Generate camera map.
const cameraMap: Record<string, Config.Camera> = {};
for (const cameraGroup of Config.cameraGroups) {
	for (const camera of cameraGroup.cameras) {
		cameraMap[camera.identifier] = camera;
	}
}

const publicMap: Record<string, Config.Camera> = {};
for (const cameraGroup of Config.cameraGroups) {
	for (const camera of cameraGroup.cameras) {
		const c = {
			...camera
		}
		delete c.credentials;
		publicMap[camera.identifier] = c;
	}
}

export function SetupWebSockets(App: any) {
	const { proxy } = RtspRelay(App);

	App.get("/api/cameraMap", (req: Request, res: Response) => {
		res.json(publicMap);
	});

	App.ws("/api/stream/:identifier/:stream", (ws: any, req: any) => {

		// Unknown camera...
		if (! cameraMap[req.params.identifier])
			return;

		let stream = req.params.stream;
		if (stream !== "preview" && stream !== "full")
			stream = "preview";

		const camera = cameraMap[req.params.identifier];

		try {

		const url = `rtsp://${camera.host}:${camera.port}/user=${camera.credentials.username}&password=${camera.credentials.password}&channel=${camera.channel}&stream=${(camera.stream as any)[stream]}`;

		proxy({
			url,
			transport: "tcp",
			additionalFlags: ["-q", "25"]
		})(ws);

		} catch (e) {
			console.log(e)
		}
	});
}
