# starter-api

Starting point for creating new Typescript APIs. This project can/will be refined as we learn more about TS and find 
better ways of achieving what we are trying to do in our typescript projects. Currently it is setup to connect with
PostgreSQL as all existing APIs are using this database.

## Setup
Currently the Dockerfile-dev environment is ready to go with the entrypoint using nodemon to monitor file changes. To use
this setup you will of course need Docker installed first. Run the container with the following replacing `<image_tag>` 
with any tag name you wish, `<image_name>` to identify the container easier when running `$ docker ps` and `<desired_port>`
with the port that you want to use on your host computer.

```shell script
docker build -f Dockerfile-dev.dockerfile -t <image_tag> . \
&& docker run \
-p <desired_port>:3000 \
-v "$(pwd)":/app \
--name <image_name> \
<image_tag>
``` 

\* Note: this command MUST be ran in the root location of the project to work! `npm install` must also be ran prior to this.
