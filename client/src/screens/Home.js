import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Plyr from "plyr";
import dashjs from "dashjs";

import "../assets/plyr.css";

export default function Page() {
	const params = useParams();
	const { streamId } = params;

	useEffect(() => {
		const el = document.getElementById("player");
		const dash = dashjs.MediaPlayer().create();
		dash.initialize(
			el,
			`http://localhost:8000/live/${streamId}/index.mpd`,
			true
		);
		const player = new Plyr(el, {
			controls: [
				"play-large",
				"play",
				// "progress",
				// "current-time",
				"mute",
				"volume",
				"captions",
				// "settings",
				"pip",
				"airplay",
				"fullscreen",
			],
		});
		player.play();
	}, [streamId]);

	return (
		<div className="flex flex-col items-center pt-24 space-y-2">
			<p className="text-xl font-mono text-gray-600">Streaming {streamId}...</p>
			<video id="player" />
		</div>
	);
}
