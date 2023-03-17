import connectMongo from "./connectMongo.js";

export default class connectDB {
  constructor(dbType) {
    this.dbType = dbType;
  }

  connect() {
    const db = process.env.DB || "mongodb";
    switch (this.dbType) {
      case db:
        connectMongo();
        break;
      default:
        throw new Error(`${this.dbType} is not a supported database.`);
    }
  }
}
