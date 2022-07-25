FROM node

WORKDIR /my_protein_rus

COPY package*.json /my_protein_rus

RUN npm install

COPY . .

EXPOSE 7000

CMD ["node", "index.js"]