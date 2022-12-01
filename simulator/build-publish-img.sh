#!/usr/bin/env bash

docker build --pull -t xanonymous/smart-space --squash . && docker push xanonymous/smart-space
