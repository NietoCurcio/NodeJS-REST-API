# NodeJS REST API

## Docker

A Docker container image is a package of software that includes everything needed to run an application (code and dependencies). When an image is run, it becomes a container. A container runs isolated from its environment. Therefore, even in development, it is an external service.

Containers are portable anywhere, run on the same machine, and share the machine’s OS system kernel (no need to set up a virtual machine for each service. Actually, each container runs as an isolated process).

The image below, from [Docker website, "What is a Container?"](https://www.docker.com/resources/what-container/), shows an infrastructure comparison between containers and virtual machines:

<img src=".github/docker-containers.png" width="696px">

In the Virtual Machines scenario, it states that: "Virtual machines (VMs) are an abstraction of physical hardware turning one server into many servers. The hypervisor allows multiple VMs to run on a single machine. Each VM includes a full copy of an operating system, the application, necessary binaries and libraries – taking up tens of GBs. VMs can also be slow to boot."

### Dockerfile

With Docker, we can define instructions to build a docker container image through a `Dockerfile`; building and running an image:

```shell
$ docker build -t image-name .
```

```shell
$ docker run -p 3333:3333 image-name

# -p 3333:3333 creates a mapping between the host’s port 3333 to the container’s port 3333
```

Additional commands:

```shell
$ docker ps

# Lists containers running
```

```shell
$ docker ps -a

# Lists all containers (up and down)
```

```shell
$ docker rm container-id
```

```shell
$ docker start container-id

# Starts a created container
```

```shell
$ docker logs container-name
```

```shell
$ docker exec -it container-name bash

# Access container terminal (similar to accessing a machine through ssh)
```

> Overall, both the container's id and name can be used interchangeably in these commands.

We can also use docker-compose to document and configure all of the application’s service dependencies (databases, message brokers, service APIs, etc).

```shell
$ docker-compose up -d

# Starts a container for each dependency configured, -d flag (detached mode).
```

Additional commands

```shell
$ docker-compose stop

# Stops services running
```

```shell
$ docker-compose stop

# Stops services running and removes the containers (passing --volumes flag also removes the data volume)
```

## Rocketseat Education

I studied this project during the Node.js Ignite program by Microsoft. Ignite is an acceleration program focused on specialization paths according to your choice and career moment.
