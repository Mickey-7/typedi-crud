import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";

@Service()
export class UserController {
    constructor(private userService: UserService) {

    }

    createUser(req: Request, res: Response): void {
        const { name, email } = req.body;
        const newUser = this.userService.createUser(name, email);
        res.status(201).json(newUser);
    }

    getAllUsers(req: Request, res: Response): void {
        const users = this.userService.getAllUsers();
        res.status(200).json(users);
    }

    getUserById(req: Request, res: Response): void {
        const { id } = req.params;
        const user = this.userService.getUserById(id);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(user);
        }
    }


    updateUser(req: Request, res: Response): void {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = this.userService.updateUser(id, name, email);
        if (!updatedUser) {
            res.status(404).send("user not found")
        } else {
            res.status(204).send(updatedUser);
        }
    }



    deleteUser(req: Request, res: Response): void {
        const { id } = req.params;
        const deletedUser = this.userService.deleteUser(id);
        if (!deletedUser) {
            res.status(400).send("user not found")
        } else {
            res.status(204).send();
        }
    }
}