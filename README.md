# Gatorbnb

- SFSU housing / real estate website full stack project

# Development

- PostgreSQL
- ExpressJS
- ReactJS
- NodeJS
- NPM

# Screenshots
![alt text](https://i.imgur.com/6f8DvxQ.png)
![alt text](https://i.imgur.com/wMwOd5K.png)
![alt text](https://i.imgur.com/HKGkonJ.png)
![alt text](https://i.imgur.com/k8mZ5k2.png)
![alt text](https://i.imgur.com/YNbJ7SR.png)
![alt text](https://i.imgur.com/dqY8Ryy.png)

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

# Team Member Contribution

### Peter Vinh Le (team lead)

- Database design
- Database migration / implementation
- Manage / setting up production server and development environment
- Set up vertical prototype / design
- API endpoints / queries
- API sessions
- Photo file system / upload photos
- 98 Github commits

### Jawyn Sunga (front end lead)

- Created pages/UI for landing page, home, filter, search, navbar, listing results, listing details, dashboard, and admin dashboard
- Connected all the pages to the API
- Fixed all the bugs/issues on the front end
- Managed all the routes
- Handled all the front end logic
- 63 Github commits

### Wesley Goldfisher (back end lead)

- Database design
- Database implementation
- API endpoints
- API authentication / registrationi
- Admin authentication
- Update admin routes
- 11 Github commits

### Anthony Owyeong 

- Database design
- Environment tester
- Created disclaimers and welcoming messages
- Milestones/documentation contributor
- 6 Github commits

### Tanya Wong

- UI design
- Created registration page/UI
- Milestones/documentation contributor
- 2 Github commits

### Mehi Ledwon

- UI design
- Website logo
- Created login page/UI
- Milestones/documentation contributor
- 3 Github commits

### Hoang Dong

- UI design
- Created post listing page/UI
- Milestones/documentation contributor
- Brought snacks
- 2 Github commits
