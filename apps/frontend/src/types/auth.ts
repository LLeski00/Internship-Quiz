type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type LoginData = {
    email: string;
    password: string;
};

type JwtResponse = {
    token: string;
};

export { RegisterData, JwtResponse, LoginData };
