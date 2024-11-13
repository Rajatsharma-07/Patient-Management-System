# Patient-Management-System

This project is built with JavaScript, NodeJs and MongoDB as Database. The project also includes code documentation

## Table Contents

1. Project Setup
2. Technologies Used

## Project Setup

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajatsharma-07/Patient-Management-System.git
   cd Patient-Management-System

2. Install dependencies:
    ```bash
    npm install

3. Run the seed command:
    It will create all the roles in the databaes and also an Admin with Admin role(email: admin@gmail.com, password: admin@123).
     ```bash
     npm run seed

3. Start the development server:
    ```bash
    npm start
This will start the Nodejs application at http://localhost:5000 Default Port:3000
    
# Technologies Used
JavaScript | NodeJs | MongoDB(as Database)

# Note
1. Please create the env file from env.sample or rename the env.sample file to .env.
2. Create a new database in your mongoDB Compass with name "patient_management_system" and for connection purpose use the localhost:27017 connection in mongoDB Compass.

