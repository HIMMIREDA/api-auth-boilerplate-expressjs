# A boilerplate for auth api with jwt tokens using Expressjs and MongoDB

## Project Setup

To run project locally:

- Clone repo
- `npm install` in root directory
- cp env.example .env
- Add your env variables values in .env
- `npm start` to run nodemon in watch mode
- Use [postman](https://https://www.getpostman.com/) to test endpoints 

## Overview of auth system:

### Register route(/register POST) (user credentials sent in the request body)

1.  User registers account. Password is hashed and salted with bcrypt and is stored in database
2.  a jwt access token generated which will be  returned in response body.
3.  a jwt refresh token created and stored in database and is set in a http only cookie along with the server's response.
4.  a csrf token also generated and stored in a cookie


### Login route(/login POST) (user credentials sent in the request body)

1. User enters credentials, server validates credentials.
2. if valid a jwt access and refresh token and a csrf token are generated as the register route


### Logout route(/logout GET)

1. User sends a GET request to /logout with the refresh token as a cookie (JWT-REFRESH-TOKEN)
2. delete the refresh token from database
3. clear the cookie


### refresh the token route(/refresh GET)

1. user sends a GET request to /refresh with the jwt refresh token cookie.
2. get the user related to this refresh token.
3. if user exists, we generate a new access token and a new refresh token.
4. we delete the old refresh token from database, and we add the new one.
5. send the access token in the response body and change the refresh token cookie value to the new refresh token


### protected routes (/posts GET,POST | /posts/:id GET,DELETE,PUT)
- posts routes are just an example of protected routes , hence i didnt add a post model  and i didnt complete post controllers functions, you can add your own protected routes.
- those routes to respond properly , the request must have an authorization header containing the access token (Bearer <accesToken>) also a (X-XSRF-TOKEN) header containing the csrf token value (this token is the one stored in the XSRF-TOKEN cookie when users logs in)  


### CSRF Protection

1. the verifyCSRF middleware is responsible for csrf Protection
2. this middleware compare the csrf token coming from the X-XSRF-TOKEN custom http header and the csrg token store in the payload of jwt access token
3. if they are the same this middleware gives the control to the next request handler  


