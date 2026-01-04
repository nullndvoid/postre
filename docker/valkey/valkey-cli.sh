#!/bin/sh

# Connects to the valkey server CLI for debugging and whatever else.
docker compose exec valkey-cli valkey-cli -h valkey -p 6379