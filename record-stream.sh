#!/bin/bash
if [ $# -ne 1 ]; then
	echo "Usage: ./record-stream.sh [ip-address]"
	exit 1
fi

remoteAddr=$1

mkdir -p data
cd data

while true; do

	echo "Starting ffmpeg to record stream from $remoteAddr"
	ffmpeg \
		-hide_banner -y \
		-loglevel warning \
		-rtsp_transport tcp \
		-stimeout 30000000 \
		-use_wallclock_as_timestamps 1 \
		-i "rtsp://$remoteAddr:554/user=admin&password=&channel=0&stream=0.sdp" \
		-r 25 \
		-vcodec copy \
		-acodec copy \
		-f segment \
		-reset_timestamps 1 \
		-segment_time 1800 \
		-segment_format mkv \
		-segment_atclocktime 1 \
		-strftime 1 $remoteAddr-%Y-%m-%d_%H:%M:%S.mkv

	echo "ffmpeg exited for stream $remoteAddr with code $?. Restarting in 5 seconds..."
	sleep 5

done
