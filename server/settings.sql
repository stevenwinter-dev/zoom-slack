CREATE DATABASE zoom_slack;
CREATE TABLE message(
    message_id SERIAL PRIMARY KEY,
    user_name TEXT,
    body TEXT,
    channel TEXT,
    date TEXT,
    time TEXT
);