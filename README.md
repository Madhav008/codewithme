# RESTful API

This is a RESTful API example based on Node.js and MongoDB, following the **MVC pattern** i.e. Model ~~View~~ Controller.

**Mongoose** is used for Database transactions which is an elegant solution to mongodb object modeling for node.js.

The application is **production ready**, and can be used behind a Nginx reverse proxy securely.

---

#### To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/Madhav008/codewithme
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=5000
MONGODB_URI=mongodb://madhav:madhav@192.168.1.123:1404/?authMechanism=DEFAULT
DB_NAME=codewithme
DB_USER=madhav
DB_PASS=madhav
GITHUB_CLIENT_ID=c2249f2c5a16fbbcde0d
GITHUB_SECRET=5d0f77d7ef1907a822d3478486ab6e3009b4a274
clientURL=http://192.168.1.123:3000
judgeApi=http://192.168.1.124:2358
backendURL=http://192.168.1.123:5000
```

Step 4: Start the API by

```bash
npm start
```

## Author

- [**Hari Om**]

## License

This project is licensed under the MIT License.
