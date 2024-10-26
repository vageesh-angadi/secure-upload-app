# Secure Upload App

A React application for securely uploading files to AWS S3 with Firebase authentication. Supports multiple environments (`dev`, `preprod`, `prod`) using environment-specific configuration files.

## Features

- **User Authentication**: Secure login and registration via Firebase.
- **File Upload**: Authenticated users can upload files to AWS S3.
- **Environment Configurations**: Separate `.env` files for development, preproduction, and production.

---

## Prerequisites

To set up and run this project, you’ll need:
- **Node.js** installed
- **Firebase** and **AWS S3** credentials

---

## Getting Started

### 1. Clone the Repository


- git clone <your-github-repo-url>
- cd secure-upload-app

### 2. Install Dependencies

- npm install

### 3. Set Up Environment Files
In each of the following environmental file:
- .env.dev
- .env.preprod
- .env.prod

Replace each placeholder (your-firebase-api-key, etc.) with your actual Firebase and AWS credentials.
# AWS Config
- REACT_APP_S3_REGION=your-s3-region
- REACT_APP_S3_BUCKET_NAME=your-s3-bucket-name
- REACT_APP_AWS_ACCESS_KEY=your-aws-access-key
- REACT_APP_AWS_SECRET_KEY=your-aws-secret-key


### 4. Running the Application
To start the app in development mode:
- npm run start:dev

For other environments:
- Preproduction: npm run start:preprod
- Production: npm run start:prod


### 5. Using the Application
#### Login/Register:

- Open the app to access the login page.
- If you don’t have an account, click Register to create one.
- Use your credentials to log in and access the Home page.
#### Upload a File:
- On the Home page, you can select a file to upload.
- Only authenticated users can upload files. If not logged in, you'll see an option to log in first.

#### Logout:
- After completing your tasks, click Logout to securely end your session.
