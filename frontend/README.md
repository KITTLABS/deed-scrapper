# Deployment

## Frontend
We are using Vercel to deploy our front end. Whenever there is a change to master it will trigger a deployment to our apps public url:

`https://deed-scrapper-rsr7.vercel.app/`

When adding new merge request vercel will create preview deployments for each merge request so we can test everything before merging to master.


## Backend
We are using Digital Ocean for running our NodeJS server + our chainlink node.

Chainlink node repo: https://github.com/KITTLABS/chainlink-node

