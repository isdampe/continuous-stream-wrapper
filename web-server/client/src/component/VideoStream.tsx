import { useEffect, useRef, useState } from "react";
import "./VideoStream.css";

type TProps = {
	url: string;
};

export function VideoStream({ url }: TProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState("preview");

	useEffect(() => {
		if (canvasRef.current) {
			(window as any).loadPlayer({
				url: `${url}/${size}`,
				canvas: canvasRef.current
			});
		}

	}, [url, size]);

	function toggleSize() {
		setSize(size === "preview" ? "full" : "preview");
	}

	return (
		<div className={`video-stream ${size}`}>
			<canvas onDoubleClick={toggleSize} ref={canvasRef}></canvas>
		</div>
	)
}