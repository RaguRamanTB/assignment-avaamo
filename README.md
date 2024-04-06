# File Data Analyzer

This application provides a user interface for basic file data analysis and masking. It allows users to upload multiple large files, presents analytics for each file, finds the count of specific words and their synonyms, and masks a given set of words in the file.

## Live Demo :rocket:

Check out the live demo of the application [here](http://139.59.8.244:3000/).

### Disclaimer :warning:

Please note that the current deployment is a development build and may not represent the final version of the application. It is intended for testing and review purposes only.

## Features :star:

1. Upload multiple large files.
2. View analytics for each file, including file name, file size, and a list of unique words with their counts.
3. Find the count of specific words and their synonyms using the Yandex Dictionary API.
4. Mask a given set of words in the file and download the updated file.

## Tech Stack :hammer_and_wrench:

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Containerization: Docker

## Running the Application Locally :computer:

1. Install Docker and Docker Compose on your machine.
2. Clone this repository.
3. Run `docker-compose up` in the root directory of the project.

## Design

The application consists of a React frontend, a Node.js backend, and a MongoDB database. The frontend communicates with the backend through a REST API, and the backend communicates with the database through Mongoose.

## System Architecture

![System Architecture](https://url-to-your-image.png)

### Front-End: (file-data-analyzer-ui/)

#### Folder Structure:

1. `src/assets/` - Folder containing the images, lottie animations, and fonts.
2. `src/components/` - JSX components that are used to render in pages.
3. `src/pages/` - Main pages rendered for the application.
4. `src/reducers/` - Redux reducers/slices that are used for the application store.
5. `src/utils/` - Helpers and API Routes

#### Dependencies:

1. _Ant Design_ - UI Design Library
2. _Redux Toolkit_ - For application state management.
3. _Axios_ - For API calls.
4. _Lottie_ - For animation using lottie files.

### Back-End: (file-data-analyzer-api/)

#### Folder Structure:

1. `controllers/` - API controllers for handling the business logic.
2. `middlewares/` - Custom middlewares (multer - for file upload).
3. `models/` - MongoDB models required for the application.
4. `routes/` - Express routers.

#### Dependencies:

1. _Multer_ - For file upload handling.
2. _Mammoth, DocxTemplater, PizZip, Textract_ - For file processing (.txt and .docx)

## Assumptions

1. The Yandex Dictionary API is available and the API key is valid.
2. The files uploaded by the user are text files (.docx or .txt file formats).
3. The words to be masked are provided by the user.

## Important Test Cases

1. Uploading a file and viewing its analytics.
2. Finding the count of a specific word and its synonyms.
3. Masking a word in a file and downloading the updated file.

## Deployment

The application is containerized using Docker for easy deployment. You can build and run the Docker containers using Docker Compose with the `docker-compose up` command.
