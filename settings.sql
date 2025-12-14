-- CREATE DATABASE zoom_slack;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_avatar VARCHAR(255)
);

CREATE TABLE message(
    message_id SERIAL PRIMARY KEY,
    user_id INT,
    user_name TEXT,
    user_avatar TEXT,
    body TEXT,
    channel TEXT,
    date TEXT,
    time TEXT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_name, user_email, user_password, user_avatar) VALUES ('Steven', 'test@gmail.com', 'test123', 'https://upload.wikimedia.org/wikipedia/en/0/0f/Charlie_Kelly.png');

-- DbGate Tables

-- CREATE TABLE "public"."users" ( 
--   "user_id" SERIAL,
--   "user_name" TEXT NOT NULL,
--   "user_email" TEXT NOT NULL,
--   "user_password" TEXT NOT NULL,
--   "user_avatar" TEXT NULL,
--   "id" INTEGER NOT NULL,
--   CONSTRAINT "PK_users" PRIMARY KEY ("user_id")
-- );

-- CREATE TABLE "public"."message" ( 
--   "message_id" SERIAL,
--   "user_id" INTEGER NULL,
--   "user_name" TEXT NULL,
--   "user_avatar" TEXT NULL,
--   "body" TEXT NULL,
--   "channel" TEXT NULL,
--   "date" TEXT NULL,
--   "time" TIME WITHOUT TIME ZONE NULL,
--   CONSTRAINT "PK_message" PRIMARY KEY ("message_id"),
--   CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id")
-- );
