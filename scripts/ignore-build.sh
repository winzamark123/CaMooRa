#!/bin/bash

# ignore-build.sh

# Check if the current branch is 'main'
if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then
  # Proceed with the build
  exit 1
else
  # Skip the build
  echo "🛑 - Build cancelled for branch $VERCEL_GIT_COMMIT_REF"
  exit 0
fi
