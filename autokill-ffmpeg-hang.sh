pids=$(ps aux | grep ffmpeg | grep "192.168" | awk '{print $2}')
pids_array=($pids)

for pid in "${pids_array[@]}"; do
	fp=$(readlink -f /proc/$pid/fd/4)

	# File isn't ready...
	if [ ! -e "$fp" ]; then
		continue
	fi

	current_time=$(date +%s)
	last_update=$(stat -c %Y "$fp")
	time_elapsed=$((current_time - last_update))

	# ffmpeg is probably stuck...
	if [ "$time_elapsed" -gt 30 ]; then
		echo "Process $pid hasn't written it's file for $time_elapsed seconds. Killing process."
		kill $pid
	fi
done