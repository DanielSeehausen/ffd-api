FROM node

WORKDIR /field-day
COPY . /field-day

RUN apt-get update
RUN apt-get install -y redis-server

RUN npm install

# server
EXPOSE 3000
# wss
EXPOSE 8080
# redis
EXPOSE 6379

# Run Redis Server
ENTRYPOINT  ["/usr/bin/redis-server"]

CMD ["npm", "start"]
