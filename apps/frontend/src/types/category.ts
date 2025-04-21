type Category = {
    id: string;
    name: string;
};

type CategoryReq = {
    name: string;
};

enum CategoryEnum {
    HISTORY = "History",
    GEOGRAPHY = "Geography",
    SPORT = "Sport",
    SCIENCE = "Science",
    MEDIA = "Media",
    GENERAL = "General",
}

export { Category, CategoryEnum, CategoryReq };
