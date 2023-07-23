#!/bin/bash
if [ $# -ne 2 ]; then
	echo "Usage: ./rtsp-subnet-relay.sh [ip-address] [local-port]"
	exit 1
fi

remoteAddr=$1
localPort=$2

while true; do

	echo "Opening socat relay for localhost:$localPort <-> $remoteAddr:554"
	socat tcp-listen:$localPort,reuseaddr,fork tcp:$remoteAddr:554
	echo "socat exited for relay $localPort <-> $remoteAddr:554 with code $?. Restarting in 5 seconds..."
	sleep 5

done