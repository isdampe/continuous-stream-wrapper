import express from "express";
import Config from "./Config";
import { SetupWebSockets } from "./Ws";

const App = express();

SetupWebSockets(App);

App.use(express.static("client/dist"));


App.listen(Config.http.port, () => {
	console.log("Listening on port 2000");
});

export default App as any;
