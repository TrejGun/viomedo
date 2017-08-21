Viomedo
=======


this is a code challenge result for viomedo
to make a first run type in console

```bash
npm i
nano ecosystem.development.json
# replace /Users/trejgun/projects/viomedo/ with your path
nano server/configs/posgress.js
# set proper db 
nano run start
# starts server in a dev mode
npm run build
npm run prod 
# starts server in prod mode
npm run test test/api/application.js
# to run API test
npm run test test/e2e/application.js
# to run E2E tests, don't forget to start server
```

navigate to http://localhost:3000/