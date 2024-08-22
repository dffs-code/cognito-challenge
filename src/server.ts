import { app } from './app';
import databaseConnection from './database/connection'

const PORT:number = Number(process.env.PORT) || 3000;

databaseConnection
  .then(() => app.listen(PORT, ()=> {
    console.log("Server up")
  }))
  .catch(console.error);