# Test

Backend: koa@next  
Frontend: vanilla  
db: mongo  

## Start 
```bash
  $ npm i
  $ npm run dev
```
## routes
  GET '/'       - upload image
  GET '/login'  - login
  GET '/feed'   - admin panel for monitoring new pictures, auth required
## Notice
App start throught babel-node on port 3000 and require node v4.0.0 or higher.  
If you need to build it do not forget to require babel-polyfill.  
Port and db can be changed in ./config  
Tested on node v6.3.0  
