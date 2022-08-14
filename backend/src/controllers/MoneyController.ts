import { ObjectId } from "mongodb";
import MongoDBClient from "../utilities/MongoDBClient";

import createRandomString from "../utilities/CreateRandomString";

class MoneyController {
    public async updateBalance(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $set: {
                balance: parseFloat(data.newBalance)
        }})

        return {"message": "Balance updated!"}
    }

    public async saveOperation(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        while (true) {
            var randomString = createRandomString(10);
            if (!(await collection.find({"dates.$.operationID": randomString}).toArray()).length) break;
        }

        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $push: {
                "dates.money": {
                    operationID: randomString,
                    title: data.title,
                    dateTime: data.dateTime,
                    direction: data.direction,
                    secondSide: data.secondSide,
                    amount: parseFloat(data.amount),
                    processed: new Date(data.dateTime) < new Date()
                }
            }
        })

        return {"message": "Operation added!"}
    }
    public async deleteOperation(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $pull: {
                "dates.money": {
                    operationID: data.operationID
                }
            }
        })

        return {"message": "Operation deleted!"}
    }
}

export default MoneyController;