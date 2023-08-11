#!/bin/bash
if [ $# -ne 2 ]; then
	echo "Usage: ./expunge-recordings.sh [ip-address] [number-of-days-to-retain]"
	exit 1
fi

remoteAddr=$1
numberOfDays=$2

if [ ! -d "./data" ]; then
	exit 1
fi

find ./data -name "$remoteAddr-*.mkv" -mtime +$numberOfDays -exec rm {} \;
find ./data -name "$remoteAddr-*.jpg" -mtime +$numberOfDays -exec rm {} \;