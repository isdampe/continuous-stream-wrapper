#!/bin/bash

thumbnail_exists() {
	local file="$1"
	local thumbnail="${file%.mkv}.jpg"
	[[ -f "$thumbnail" ]]
}

if [ -z "$1" ]; then
	echo "Usage: $0 <source_directory>"
	exit 1
fi

source_dir="$1"
if [ ! -d "$source_dir" ]; then
	echo "Error: Source directory not found"
	exit 1
fi

cd "$source_dir" || exit 1

for video_file in *.mkv; do
	if ! thumbnail_exists "$video_file"; then
		ffmpeg -i "$video_file" -ss 00:00:01 -vframes 1 "${video_file%.mkv}.jpg"
		echo "Thumbnail generated for $video_file"
	else
		echo "Thumbnail already exists for $video_file"
	fi
done
