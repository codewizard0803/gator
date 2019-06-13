# Gatorbnb

- SFSU housing / real estate website project

## Development

# How to install Repository

Clone the repo:

```sh
git clone https://github.com/CSC-648-SFSU/csc648-sp19-team05.git
```

# How to Build and Set Up

- Navigate to root repo and run the following command to download all dependencies Express:

```sh
npm install
```

- Navigate to the /client and run the following command to download all dependencies for React:

```sh
npm install
```

- Navigate back to the root repo and create a new file .env
- Set up the .env file with correct variables (username, password, port, database_name)

```sh
LOCAL_DATABASE_URL=postgres://username:password@localhost:port/database_name
BACKEND_URL=http://localhost:5000/api
SESSION_SECRET=CATKEYBOARD
```

- Migrate the database using Sequelize:

```sh
npm run db:migrate
```

- Seed the database by running:

```sh
npm run db:seed
```

# How to Run

- Run backend API in development by running the following command from root repo:

```sh
npm run start:dev
```

- Open a new terminal and navigate to /client and run the following command to run React

```sh
npm start
```
