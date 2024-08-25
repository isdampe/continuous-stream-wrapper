import { useEffect, useState } from "react";
import { VideoStream } from "./component/VideoStream"
import "./App.css";

function App() {
	const [cameraList, setCameraList] = useState([]);

	useEffect(() => {

		if (cameraList.length > 0)
			return;

		fetch("/api/cameraMap")
			.then(res => {
				res.json()
				.then(r => setCameraList(Object.values(r)))
			}).catch(err => {
				console.error(err)
				window.alert("Failed to fetch camera list.")
			})

	}, []);

	if (cameraList.length < 1)
		return null;

	return (
		<div className="grid">
			{cameraList.map((camera: any) => (
				<div className="camera-wrapper" key={camera.identifier}>
					<VideoStream
						url={`ws://${window.location.host}/api/stream/${camera.identifier}`} />
				</div>
			))}
		</div>
	)
}

export default App
