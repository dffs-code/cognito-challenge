import { app } from './app';
import { AppDataSource } from './data-source';

const PORT:number = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => app.listen(PORT, ()=> {
    console.log("Server up")
  }))
  .catch(console.error);