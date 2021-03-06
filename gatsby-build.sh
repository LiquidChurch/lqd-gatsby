#!/bin/bash

echo "Looking up current job status"

echo "done" > build_status.txt
JOB_STATUS=$(<build_status.txt)

if [[ "$JOB_STATUS" == done ]]; then
  echo "Job is done"
fi
exit 0


  
echo -e "Check for existing process"
FILE=build_pid
if test -f "$FILE"; then
    echo $FILE
    OLD_PID=$(<build_pid)
    echo $OLD_PID
    echo "killing old process"
    kill -15 $OLD_PID
    sleep 10
fi

echo "Starting Gatsby Build Process"
current_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "Running Gatsby Clean"
gatsby clean
echo "Running Gastby Build"
gatsby build >> ./logs/build.$current_time.log 2>&1 &
RETVAL=$?
PID=$!
[ $RETVAL -eq 0 ] && echo $PID > build_pid && echo success || echo failure

while [ $RETVAL -eq 0 ]
do
  echo "still running"
  output=$(ps -p "$PID")
  RETVAL=$?
  sleep 5
done

echo "removing build_pid"
rm build_pid
