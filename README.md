# Tour Agencies Web Application

This is a simple web application for managing tour agencies, where CRUD (Create, Read, Update, Delete) operations are implemented using Node.js and Express.js. The application provides a basic structure for handling tour data, allowing you to perform operations like adding new tours, viewing tour details, updating tour information, and deleting tours

![image](https://github.com/silvermete0r/tours-agency-nodejs-final-assignment-1-2/assets/108217670/9d5efff3-e8a6-4f03-a7b6-a6b5728c42c8)

![image](https://github.com/silvermete0r/tours-agency-nodejs-final-assignment-1-2/assets/108217670/756a3570-683a-419c-8341-ff4e0312b7c5)

![image](https://github.com/silvermete0r/tours-agency-nodejs-final-assignment-1-2/assets/108217670/182a5e16-846c-4a13-8e7a-1b3af251f504)

![image](https://github.com/silvermete0r/tours-agency-nodejs-final-assignment-1-2/assets/108217670/8ad208e0-54aa-4817-b75c-ce739a78c791)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/tours-agency-nodejs-final-assignment-1-2.git
    ```

2. Navigate to the project directory:

    ```bash
    cd tours-agency-nodejs-final-assignment-1-2
    ```

3. Install the required npm packages:

    ```bash
    npm install
    ```

## Usage

1. Run the application:

    ```bash
    npm run dev
    ```

2. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the home page of the Tour Agencies Web Application.

## API Routes

The application exposes the following API routes for managing tour data:

- `GET /tours`: Get a list of all tours.
- `GET /tours/:id`: Get details of a specific tour.
- `POST /tours`: Add a new tour.
- `PUT /tours/:id`: Update information for a specific tour.
- `DELETE /tours/:id`: Delete a specific tour.

For example, to get the list of all tours, you can make a GET request to [http://localhost:3000/tours](http://localhost:3000/tours).

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Description of changes'`.
4. Push your changes to your fork: `git push origin feature-name`.
5. Create a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore and enhance the functionality of the Tour Agencies Web Application! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.
