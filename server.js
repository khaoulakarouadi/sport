// import app file that has been exported in the app.js file
const app = require("./backend/app");

//make Server Listening on PORT 3000
//3ibara 9otlou lansi el app aal http://localhost:3000, yefhemha 3000 kahaw 5atr ne5dem aal adresse locale
// bel app sta3melnelah fel business logic dans le fichier app.js
app.listen(3000, () => {
    console.log("BE Server is listening on PORT 3000 ....");
});