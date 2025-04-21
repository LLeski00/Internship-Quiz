import { UserScore } from "./score";

enum UserRole {
    ADMIN = "Admin",
    USER = "User",
}

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

type UserDetails = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    scores: UserScore[];
};

export { UserRole, User, UserDetails };
