# FROM some node runtime, i.e. <node:x.xx>

WORKDIR /field-day
COPY . /field-day

# TODO check actual install for these and incorporate
# RUN apt-get install pm2
# RUN apt-get install redis
# RUN apt-get install redis-ml dependencies
RUN npm install

EXPOSE 3030

# TODO update for arg passing (group count)
CMD ["npm", "run start"]
