# Voyage app built with Next.js and Spring Boot

## Installation

**Prerequisites**
*docker* and *docker-compose*,
The images *nextjs-app*, *springnoot-app* and *mysql* that you can pull from DockerHub

    docekr puul abdlhk/app
    docker pull abdelhk/nextjs-app
    docker pull mysql

**Startup**
After pulling the project, run the following commands in the root of the project (where *docker-compose.yml* exists):

    docker-compose build
    docker-compose up

The web app will be available at:
http://localhost:3000.
