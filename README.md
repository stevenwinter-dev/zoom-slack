# Zoom Slack

![Zoom-Slack](https://i.imgur.com/GeR0stO.png)

## [Check it out!](https://zoom-slack.vercel.app/)

## Introduction

Zoom Slack is a web app that combines features from, you guessed it, Zoom and Slack. Registered users and guests can text chat as well as video chat. The texts are tied to each account and persist even after users leave the site.

Upon arrival to the site, the visitor can choose to register for an account, login to their account, or continue as a guest. 

![realestate9mb](https://media2.giphy.com/media/hJLwLNO8LhlWgPgbai/giphy.gif?cid=790b7611f24cfc1f489f51aa08b41c417abd5774be1df83d&rid=giphy.gif&ct=g)


## Technologies Used

- HTML
- CSS
- JavaScript
- React
- Next.js
- Node.js
- Express
- Postgres

## Key Packages

- Socket .IO
- WebRTC
- JSON Web Tokens
- Nodemailer

## Install Instructions
```bash
git clone https://github.com/stevenwinter-dev/zoom-slack
cd zoom-slack
npm install
node index.js
cd client
npm install
npm run dev
```

## Initial Wireframe

![Wireframe](https://i.imgur.com/5NevTiw.jpg)

## User Stories

### MVP
- As a user, I want to text chat with people.
- As a user, I want to video chat with people.
- As a user, I want both chat options to be fast.
- As a user, I want to have multiple rooms available to me.
- As a user, I want to view previous messages.

## Major Hurdles

- WebRTC is a powerful technology for peer-to-peer video communication, e.g. FaceTime with a 1 to 1 relationship. The issue I discovered was adding multiple peers to a call creating a 1 to many relationship. A package called Peer.js helped with the solution to this problem. Basically, as one person joins the video chat they will be connected to the previous person who joined. That connection triggers a DOM update which adds the new callers video to the entire group. I found this to be quite challenging to implament both on the frontend and backend.

- Working with Socket.IO is one of the big reasons I decided to build this project. Websockets provide an extremelly fast connection to the server, ideal for chat applications. Gaining a working knowledge of the syntax took some time though. This blocker really held up development of the entire project as both the text chat and video chat use socket io. Also, combining both caused numerous bugs. Every few hours I needed to double check my chat was still updating because it broke easily and often!

- Next.js is a really cool way of creating a React application. There are many nuances of which I did not take full advantage. 
  - The first example is using the built in API. I believe with my project requirements using an express server for the backend was the correct choice but I'd love for my next project to work entirely in the Next.js ecosystem. 
  - Next, I'd like to use the server side rendering more than I did. With this particular app and the constant updating of information, I decided against using some of that built in server side functionality.

- Using the PERN stack was fun but challenging. There were many challenges that I did not initially expect, like the different syntax for querying my database, etc. In fact, my first memory of trying to use Postgres with Express was when I was in my index.js and started writing in Python. That's when I realized this required a different mindset than my previous apps. Ultimately, the Node-Postgres library helped solve many of my issues. 

## Future Features

- I'd like to add more functionality to user login and registration in the form of better error messages, better success messages, interacting with previous chat messages, the ability to private message and create new rooms, and many other quality of life improvements.
- The input for the text chat on mobile is not as responsive as I'd like. The CSS is good but the default browser action for typing in a form is weird.
- There is a bug where previous chat messages display text correctly but do not show the user avatar or name. The information is stored correctly in the database and there are no errors but it does not display. 
- I have not handled when a user leaves a video call. The code to have a new user join each user's call is fairly complex and I think removing them from the call on each user's screen will be equally complex.  