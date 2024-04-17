import { Service } from "typedi";
import { User } from "../models/User";

@Service()
export class UserRepository {
    private users: User[] = [];

    createUser(name: string, email: string): User {
        const newUser: User = {
            id: String(this.users.length + 1),
            name,
            email
        }

        this.users.push(newUser)
        return newUser;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id = id)
    }

    updateUser(id: string, name: string, email: string): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return undefined;
        }

        const updatedUser = {
            ...this.users[userIndex], name, email
        }

        this.users[userIndex] = updatedUser;
        return updatedUser;

    }

    deleteUser(id: string): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            return undefined;
        }

        const deletedUser = this.users[userIndex];
        this.users.splice(userIndex, 1)
        return deletedUser;
    }
}