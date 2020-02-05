# Full Stack Todo App

This project was boostrapped using `create-react-app`, tooled w/ `yarn workspaces`, inspired by Malcom Laing's guide on [Setting up a Full-Stack React Application](https://medium.com/frontend-digest/setting-up-a-full-stack-react-application-835c2a37eb7a), and mocked out using Ennio Dybeli's [ToDo List](https://medium.muz.li/todo-list-inspiration-a1d736c2718a#.u7upw5dbp).


### Technologies Used

(in no particular orde)

* TypeScript
* React.js
* Redux
* Redux-Thunk
* React-DOM
* Styled Components
* UUID
* Material React
* json-server

## Instructions

Requires Node v10.18.0

#### Install Dependencies

```
yarn install && yarn workspace client install
```

This should install all of the dependencies necessary to run the application.


#### Start Local Servers
```
yarn start
```

This will kickstart the `create-react-app` server at port `3000` so that the client-side application can be seen in the browser.

```
yarn workspace server start
```

This will start the `json-server` that will hosting our local database json file, and will be updating it based on RESTful methods.

If all is working as intended, you should be able to go to [localhost:3000](http://localhost:3000), and see the Todo Application.


## Working Operations

* Toggling the "completed" status on a todo
* Adding a new todo
* Deleting a todo
