# Task Manager App

### Tech stack
- Node.js - NestJS, Angular 19
- Tools - XAMPP, MySQL, Postman

### How to install
- Install NPM packages separately in `/backend` and `/frontend` directories by running
  
  ```
  npm install
  
  ```

### How to run
- Start all Apache Web Servers via XAMPP manager
- Start both servers in `/backend` 
  ```
  npm run start
  
  ```
  and `/frontend` directories by running
  ```
  ng serve
  
  ```
  
- You can now view frontend in the browser.
  Local:            http://localhost:4200/

- To manually prepare the database, please call these endpoints in Postman
    - Create `task-manager` database, POST request calling http://localhost:3000/tasks/create-db
    - Create `tasks` table, POST request calling http://localhost:3000/tasks/create-table

- _(Optional)_ To manually call API endpoints, server runs on port 3000 
    - Operations : Add Task, Update Task, Delete Task
 
### How to use
1. Add task - Inputs :
    - `title` - task you worked on
    - `description` - short description of what you did
    - `status` - pending or completed task `default: pending`
2. Overview table : List of Tasks by user with Edit or Delete action buttons
3. Edit task - Dialog : saves updated Title and Description field
4. Filter : Search Task to view by Title 
