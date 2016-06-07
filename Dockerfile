FROM docker.sqexeu.com/onlinedev/oap_base:latest

MAINTAINER Christopher Hooks <chris@hooks.me.uk>

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        python \
        rsync \
        software-properties-common \
        wget \
    && rm -rf /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v6.1.0

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update && \
  apt-get install -qq \
    libexpat1-dev \
    libssl-dev &&\
  ln -s /usr/bin/nodejs /usr/bin/node && \
  mkdir -p /u/app

WORKDIR /u/app
EXPOSE 3000

ADD package.json /u/app/package.json
RUN source /usr/local/nvm/nvm.sh && npm --no-color install

ADD .git/refs/heads/ /tmp/git/heads
ADD .git/HEAD /tmp/git/HEAD

ADD . /u/app
