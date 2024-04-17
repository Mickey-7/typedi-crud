import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepositories";
import { User } from "../models/User";


@Service()
export class UserService {
    constructor(private userRepository: UserRepository) {

    }

    createUser(name: string, email: string): User {
        return this.userRepository.createUser(name, email);
    }

    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    }

    getUserById(id: string): User | undefined {
        return this.userRepository.getUserById(id)
    }

    updateUser(id: string, name: string, email: string): User | undefined {
        return this.userRepository.updateUser(id, name, email);
    }

    deleteUser(id: string): User | undefined {
        return this.userRepository.deleteUser(id);
    }
}