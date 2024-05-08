const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users = require('./routes/api/users'); // Importez usersRouter ici
const auth = require("./middleware/auth");
const route= express.Router();
const loginRoute = require ('./routes/api/auth');



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB configuration
const mongo_url = config.get("mongo_url");
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB", err));



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur');
});
//Routes
app.use('/api/users', users); // Utilisez la variable usersRouter pour définir vos routes
app.use('/api/auth',loginRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

//module.exports=router;