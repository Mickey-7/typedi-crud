import express, { Application, Request, Response } from 'express';
import 'reflect-metadata'
import Container from 'typedi';
import { UserRepository } from './src/repositories/UserRepositories';
import { UserController } from './src/controllers/UserController';
import { UserService } from './src/services/UserService';


const app: express.Application = express();
app.use(express.json())

// Register repositories and services with TypeDI
Container.set(UserRepository, new UserRepository());
Container.set(UserService, new UserService(Container.get(UserRepository)));
Container.set(UserController, new UserController(Container.get(UserService)));

// Define routes
const userController = Container.get(UserController);
app.post("/users", (req: Request, res: Response) => userController.createUser(req, res))
app.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res))
app.get("/users/:id", (req: Request, res: Response) => userController.getUserById(req, res))
app.put("/users/:id", (req: Request, res: Response) => userController.updateUser(req, res))
app.delete("/users/:id", (req: Request, res: Response) => userController.deleteUser(req, res))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
})