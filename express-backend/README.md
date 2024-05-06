Hello Team,

I build an api with Express.js 

To run we need to create a table in postgres db

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


just run the command in terminal 
#npm install or yarn install
#node index.js or yarn start