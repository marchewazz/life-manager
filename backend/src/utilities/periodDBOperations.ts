import MongoDBClient from "../utilities/MongoDBClient";

import AuthController from "../controllers/AuthController";

export default async function periodDBOperations() {

    const ac = new AuthController();

    const collection = MongoDBClient.db("life-manager").collection("accounts");

    const users = await collection.find({}).toArray();

    for (const user of users) {
        for (const token of user.tokens) {
            if (new Date(token.expiringDate) < new Date()) ac.deleteToken({"userID": user._id, "token": token.token})
        }
        for (const operation of user.dates.money) {
            if (new Date(operation.dateTime) < new Date() && !operation.processed) {
                const change = operation.direction == "outgoing" ? operation.amount * -1 : operation.amount
                await collection.updateOne({"_id": user._id}, {
                    $inc: {
                        balance: change
                    },
                })
                await collection.updateOne({"_id": user._id, "dates.money.operationID": operation.operationID}, {
                    $set: {
                        "dates.money.$.processed": true
                    },
                })
            }
        }
    }

}