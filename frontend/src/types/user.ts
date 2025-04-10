enum UserRole {
    ADMIN = "Admin",
    USER = "User",
}

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

export { UserRole, User };
