#!/bin/bash
ffmpeg \
	-rtsp_transport tcp \
	-i "rtsp://192.168.0.190:6001/user=admin&password=&channel=0&stream=0.sdp" \
	-rtsp_transport tcp \
	-i "rtsp://192.168.0.190:6002/user=admin&password=&channel=0&stream=0.sdp" \
	-rtsp_transport tcp \
	-i "rtsp://192.168.0.190:6003/user=admin&password=&channel=0&stream=0.sdp" \
	-filter_complex " \
	      [0:v] setpts=PTS-STARTPTS, scale=qhd [a0]; \
	      [1:v] setpts=PTS-STARTPTS, scale=qhd [a1]; \
	      [2:v] setpts=PTS-STARTPTS, scale=qhd [a2]; \
	      [a0][a1][a2]xstack=inputs=3:layout=0_0|0_h0|w0_0|w0_h0[out] \
		" \
	-map "[out]" \
    	-c:v libx264 -f matroska - | ffplay -autoexit -
