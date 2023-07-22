All files are written to `./data/[ip-address]-Y-m-d_H:M:S.mkv` and chunked in sections of 30 minutes.

# Recording streams

```bash
./record-stream.sh [ip-address]
```

For example, `./record-stream.sh 192.168.1.10` would produce files such as `./data/192.168.1.10-2023-07-22_08:10:00.mkv` every 30 minutes.

# Expunging old files

```bash
./expunge-recordings.sh [ip-address] [number-of-days-to-retain]
```

For example, `./expunge-recordings.sh 192.168.1.10 7` would remove any recordings in `./data` for `192.168.1.10` that are older than 7 days.