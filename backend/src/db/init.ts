import { Toilet } from "./models";

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
    Toilet.sync({ alter: isDev });
};

export default dbInit;
