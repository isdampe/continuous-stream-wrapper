declare namespace Config {
	type Stream = {
		preview: string;
		full: string;
	};

	type Credentials = {
		username: string;
		password: string;
	};

	type Camera = {
		label: string;
		identifier: string;
		host: string;
		port: number;
		channel: number;
		stream: Stream;
		credentials: Credentials;
	};

	type CameraGroup = {
		label: string;
		cameras: Camera[];
	};

	type Schema = {
		http: HttpConfig;
		cameraGroups: CameraGroup[];
	};

	type HttpConfig = {
		port: number;
	};
}
