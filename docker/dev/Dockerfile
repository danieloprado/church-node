FROM node:8-alpine

ENV NODE_PENDING_DEPRECATION=1

COPY start.sh /usr/local/bin/

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && mkdir /src

WORKDIR /src

EXPOSE 3000
EXPOSE 5859

CMD start.sh