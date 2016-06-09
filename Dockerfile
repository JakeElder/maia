FROM docker.sqexeu.com/onlinedev/oap_base:latest

MAINTAINER Jake Elder <jake@jpeg.me.uk>

ENV NODE_URL https://deb.nodesource.com/node_6.x/pool/main/n/nodejs/nodejs_6.2.1-1nodesource1~trusty1_amd64.deb
ENV NODE_FILE /tmp/nodejs_6.2.1-1nodesource1~trusty1_amd64

RUN DEBIAN_FRONTEND=noninteractive \
  apt-get install -qq \
    rlwrap && \
    rm -rf /var/lib/apt/lists/* && \
    curl ${NODE_URL} -o ${NODE_FILE} && \
    dpkg -i ${NODE_FILE} && \
    rm -f ${NODE_FILE}

WORKDIR /u/app
ADD . /u/app

RUN npm --no-color install
RUN npm run build

EXPOSE 3000

CMD ["npm start"]
