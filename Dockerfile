# FROM some node runtime, i.e. <node:x.xx>

WORKDIR /field-day
COPY . /field-day

# TODO check actual install for these and incorporate
RUN apt-get install pm2
RUN apt-get install redis
RUN apt-get install redis-ml dependencies

RUN npm install

ENV HTTPPORT 3000
ENV WSPORT 8080

# TODO use env vars instead of hard code
EXPOSE <HTTPORT>
EXPOSE <WSPORT>

# TODO update for arg passing (group count)
CMD ["npm", "run start"]
