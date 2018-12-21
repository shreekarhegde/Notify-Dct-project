# Notify-Dct-project
# Overview
This project enables the user to create departments, add employees to that department, create groups, customize the calendar by marking the events automatically. Also, user can chat with everybody using global chat, add posts and comments. The code in this repository covers back end of this project.
# Dependencies and installation
1. cors `npm i cors`
2. express `npm i express`
3. mongoose  `npm i mongoose`
4. nodemon `npm i nodemon`
5. socket.io `npm i socket.io`
6. strftime `npm i strfttime`
# Usage
 ## `create, edit, view and delete Departments`
- get '/departments'
  - See the list of departments.
- get '/departments/:id'
  - View the details of a particular department, its members, events conducted by that department etc.
- put '/departments/:id'
  - Change the description, name, remove/add members.
- delete '/departments/:id'
  - Delete the department
- get 'departments/posts/:id' 
  - find the posts belonging to a department
## `create, edit, view and delete Employees`
- get '/employees'
  - See the list of employees, to see more about each employee click on the profile.
- post '/employees'
  - Create an employee with the required details.
- put '/employees'
  - Change the details and update.
- get '/employees/:id'
  - View the profile, see the calendar, chat globally
- delete
  - Delete account.
## `create, edit, view and delete Activity`
- get '/activities'
  - See the list of activities
- post '/activities'
  - Create a new activity/event, add/invite participants, add the details such as venue, date and time and guests.
- put '/activities/:id'
  - Change the details and update.
- delete '/activities/:id'
  - Delete the activity and remove the same form departments and employees who would have been added to it.
## `add Post`
- post '/posts'
  - Create a post. Comments and applause buttons get attached to it automatically whenever new post is created.
# Authors
1. [Shreekar Hegde](https://github.com/shreekarhegde) 
2. Libin K
 

