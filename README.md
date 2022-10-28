# Hackathon Project
Checkout the high level details of this project in this notion doc: https://www.notion.so/Deed-Scrapper-and-Viewer-7484d1369e9f41fe8012e87bd2fefc7a


# App Architecture
Link to miro board: https://miro.com/app/board/uXjVPKqjxK0=/

<img width="1201" alt="image" src="https://user-images.githubusercontent.com/40375385/198288824-fec7b024-48c2-48ec-aa77-6bd95dfcd60d.png">

# Deployment

## Frontend
We are using Vercel to deploy our front end. Whenever there is a change to master it will trigger a deployment to our apps public url:

https://deed-scrapper-rsr7.vercel.app/

When adding new merge request vercel will create preview deployments for each merge request so we can test everything before merging to master.


## Backend
We are using Digital Ocean for running our NodeJS server + our chainlink node. Whenever a change is made in the `backend` directory and merged to master it will automatically be released.

Chainlink node repo: https://github.com/KITTLABS/chainlink-node

