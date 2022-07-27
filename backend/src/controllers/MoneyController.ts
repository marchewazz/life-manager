import { ObjectId } from "mongodb";
import MongoDBClient from "../utilities/MongoDBClient";

import createRandomString from "../utilities/CreateRandomString";

class MoneyController {
    public async updateBalance(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        collection.updateOne({"_id": new ObjectId(data.userID)}, {$set: {
            balance: parseFloat(data.newBalance)
        }})
    }
}

export default MoneyController;