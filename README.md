# WhaTodo

WhaTodo is a full-stack web application that allows you to manage your tasks and stay organized. With WhaTodo, you can create, update, and delete tasks, as well as mark them as complete. It provides a user-friendly interface to help you stay on top of your daily to-dos.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Features

- User Registration and Authentication: Sign up and securely log in to your WhaTodo account.
- Create Tasks: Add new tasks with a title and description.
- Update Tasks: Edit task details such as title, description, and status.
- Delete Tasks: Remove tasks that are no longer needed.
- Task Status: Mark tasks as complete or pending.
- User-specific Tasks: Each user has access only to their own tasks.
- Password Encryption: User passwords are securely encrypted using bcrypt.
- Responsive Design: The application is optimized for a seamless experience on both desktop and mobile devices.

## Installation

To run WhaTodo on your local machine, follow these steps:

1. Clone the repository:
```
$ git clone https://github.com/your-username/WhaTodo.git
```
2. Navigate to the project directory:
```
$ cd WhaTodo
```

3. Install dependencies:
 ```
$ npm install
```

4. Set up the MySQL database:
- Create a new database in MySQL for WhaTodo.
- Update the database configuration in the `.env` file with your MySQL credentials.

5. Start the application:
 ```
$ npm start
```

6. Access WhaTodo in your web browser at 
```
 http://localhost:3000
```

## Usage

1. Register a new account or log in with your existing credentials.
2. Add new tasks by providing a title and description.
3. View your tasks on the dashboard.
4. Edit task details or mark tasks as complete.
5. Delete tasks that are no longer needed.

## Technologies

WhaTodo is built using the following technologies:

- Node.js: JavaScript runtime environment
- Express.js: Web application framework
- EJS: Templating engine for rendering dynamic views
- Tailwind CSS: Utility-first CSS framework for fast and responsive styling
- MySQL: Relational database management system
- bcrypt: Password encryption
- Passport.js: User authentication middleware
