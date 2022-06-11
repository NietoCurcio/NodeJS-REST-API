FROM node
# image from https://hub.docker.com/

WORKDIR /usr/app

COPY package.json ./
# Copy package.json (from localhost) into workdir in container

RUN npm install
# Runs terminal command, RUN is for an image build step
# A Dockerfile can have many RUN steps stacked

COPY . .
# Copy all current dir content (from localhost) into workdir in container

EXPOSE 3333
# A container runs in an isolated environment. Thus, it has a different IP than the local host.
# We must tell which port will be exposed.

CMD ["npm", "run", "dev"]
# Defines a default command. It can be overridden when executing: $ docker run COMMAND "command"
# Doesn't run at image building ste, executes when launching or running the image (already built).