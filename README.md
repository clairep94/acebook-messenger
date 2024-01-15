# About Acebook Messenger

Acebook Messenger is a personal extension of the [Acebook Group Project at Makers Academy](https://github.com/clairep94/acebook-team-griffins). It uses socket.io to add real-time messaging.

- [Project Brief](./project-brief/README.md)
- [Project Documentation](./project-brief/DOCUMENTATION.md)

# Project Features

## New: Messaging:



https://github.com/clairep94/acebook-messenger/assets/128436909/adb7ad43-5f59-489e-a777-af6c8abbbfb2


- Users can create chats with other users and see them in realtime
- Users can send each other messages, with emojis, and see them in realtime


## Registration & Login



https://github.com/clairep94/acebook-Griffins/assets/128436909/bd56e989-74fe-441d-98ac-067aeeb99a32


- Users can register and log in
- Users can see an error message if their email is already registered with Acebook
- Users can see an error message if the user signs in with the wrong password

## New Post


https://github.com/clairep94/acebook-Griffins/assets/128436909/a18d95f6-6a49-4c87-bcc0-c31cb1ff4149



- Users see their name in the new post text input box
- Users can post both images and text

## Timeline & Posts


https://github.com/clairep94/acebook-Griffins/assets/128436909/97a75f11-4742-4b75-912b-a834da9a83dc



- Users can see a timeline of posts, sorted by Newest first
- Users can see the post author, relative and absolute timestamps, and link to their profiles
- Users can like/unlike posts
- Users can see a list of comments
- Users can add a new comment
  
## Sort by Trending


https://github.com/clairep94/acebook-Griffins/assets/128436909/f6dfd789-a0ba-41cf-95b5-4566dfbf4920



- Users can sort posts by New or sort by Trending
- Users can see 🔥 next to trending posts -- newer posts with more recent engagement (comments, likes) are prioritised


## Searchbar


https://github.com/clairep94/acebook-Griffins/assets/128436909/d795443f-2289-4e03-8f8b-fb5f96098f03



- Users can use live-search searchbar 

## Profile


https://github.com/clairep94/acebook-Griffins/assets/128436909/b38500e9-f0e0-4d7f-8559-caabc3dc091e


- Users can see their profile, profile picture, bio, email, and past posts 
- Users can update their bios

## Friends


https://github.com/clairep94/acebook-Griffins/assets/128436909/40ae6a16-627a-41aa-9d53-e897e294134c



- Users can send/unsend friend requests on other user's profiles
- Users can confirm/deny friend requests in their friend requests page or on other users' pages 
- Users can see a notification in their navbar if they have a friend request
- Users can unfriend friends through their friends list or on other users' pages

## Timeout



https://github.com/clairep94/acebook-Griffins/assets/128436909/ce384f55-9a04-40c8-b7f0-ad4423e0f4b4


- If inactive for 20 minutes, users get timed out and a log-in prompt occurs

# Installing Project Dependencies:

### Node.js
1. Install Node Version Manager (nvm)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### MongoDB
1. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
2. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Project Dependencies

1. npm install in the three main folders:

   ``` shell
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ; cd ../socket
   ; npm install
   ```

2. Add Cloudinary account API credentials

This project uses Cloudinary for media storage. 
Add a `.env` file to your root folder and add the following variables (replacing the values with your Cloudinary account API credentials)
  
  ``` shell
  ; CLOUDINARY_CLOUD_NAME=your_cloud_name
  ; CLOUDINARY_API_KEY=your_api_key
  ; CLOUDINARY_API_SECRET=your_api_secret
  ```



# Running the App:

1. Start the server application (in the `api` directory)

   ```shell
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```

2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```shell
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/`

3. Start the socket (in the `socket` directory)

   In a new terminal session...

```shell
; cd socket
; npm start
```



# How to run automated tests

The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
```

Then run the tests in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```
