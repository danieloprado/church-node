FROM node:8-alpine

RUN mkdir /src

COPY start.sh /usr/local/bin/
ADD . /src

RUN set -x \
    &&  apk add --update git \
    && rm -rf /tmp/* /var/cache/apk/* \
    && npm install -g pm2 yarn \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && (cd /src &&  yarn install --production --force && yarn cache clean)

WORKDIR /src

EXPOSE 3000

CMD start.sh