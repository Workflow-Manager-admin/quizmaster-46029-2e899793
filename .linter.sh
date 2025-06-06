#!/bin/bash
cd /home/kavia/workspace/code-generation/quizmaster-46029-2e899793/quizmaster
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

