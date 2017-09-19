# login.dfe.oidc.clients


## Setup

If you plan to run a local version of redis the following is required:


1) You will need [brew](https://brew.sh/)
1) Once installed from terminal run ``` brew install redis ```
1) Then ```brew services start redis``` to start a local instance of redis

To run the OIDC clients project the following environment variables need to be set

**REDIS_CONNECTION** - This can be left blank for local development

**JWT_SECRET** - This is the secret which has been used to create the JWT token and used to verify

**PORT** - This is the port that you want the application to run on