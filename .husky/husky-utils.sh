# .husky/husky-utils.sh

SPINNER_CHARS=(⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏)
spinner_pid=""
step_number=1
VERBOSE=${HUSKY_DEBUG:-false}

clear_line() {
  printf "\r\033[K"
}

start_spinner() {
  local msg="$1"
  i=0
  (
    while true; do
      local spinner_char="${SPINNER_CHARS[$((i % ${#SPINNER_CHARS[@]}))]}"
      printf "\r[%s] %s %s" "$step_number" "$spinner_char" "$msg"
      i=$((i + 1))
      sleep 0.1
    done
  ) &
  spinner_pid=$!
}

stop_spinner_with_output() {
  local exit_code=$1
  local success_msg=$2
  local fail_msg=$3
  local output_file=$4

  if [ -n "$spinner_pid" ]; then
    kill "$spinner_pid" >/dev/null 2>&1 || true
    wait "$spinner_pid" 2>/dev/null || true
  fi

  clear_line

  if [ "$exit_code" -eq 0 ]; then
    printf "[%s] ✔ %s\n" "$step_number" "$success_msg"
  else
    printf "[%s] ✘ %s\n" "$step_number" "$fail_msg"
    echo -e "\a"
  fi

  if [ -s "$output_file" ]; then
    echo "┏━▶ Output Stream"
    cat "$output_file"
    echo "┗━━━━━━━━━━━━━━━━━━"
  fi

  rm -f "$output_file" 2>/dev/null || true
  step_number=$((step_number + 1))

  [ "$exit_code" -eq 0 ]
}

abort_spinner() {
  local message="$1"
  if [ -n "$spinner_pid" ]; then
    kill "$spinner_pid" >/dev/null 2>&1 || true
    wait "$spinner_pid" 2>/dev/null || true
  fi
  clear_line
  printf "[%s] ✘ %s\n" "$step_number" "$message"
  echo -e "\a"
  step_number=$((step_number + 1))
  return 1
}
