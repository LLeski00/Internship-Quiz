type RouteData = {
    path: string;
    name: string;
};

type Routes = {
    [key: string]: RouteData;
};

export { RouteData, Routes };
