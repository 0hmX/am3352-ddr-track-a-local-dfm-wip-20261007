#!/bin/sh
# Run on the assembled AM3352 target, not on the development Mac.
# Without arguments this lists DRM state; a connector ID selects 720p60/XRGB8888.
set -eu
if [ "$#" -eq 0 ]; then
  exec modetest -M tilcdc -c -p
fi
if [ "$#" -ne 1 ]; then
  printf '%s\n' "Usage: $0 [numeric-connector-id]" >&2
  exit 2
fi
case "$1" in
  ''|*[!0-9]*) printf '%s\n' 'Connector ID must be numeric.' >&2; exit 2 ;;
esac
exec modetest -M tilcdc -s "$1:1280x720-60@XR24"
