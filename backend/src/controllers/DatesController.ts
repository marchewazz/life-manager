import { ObjectId } from "mongodb";
import MongoDBClient from "../utilities/MongoDBClient";

import createRandomString from "../utilities/CreateRandomString";

class DatesController {
    public async saveDate(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        while (true) {
            var randomString = createRandomString(10);
            if (!(await collection.find({"dates.$.dateID": randomString}).toArray()).length) break;
        }

        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $push: {
                "dates.dates": {
                    dateID: randomString,
                    title: data.title,
                    description: data.description,
                    dateTime: data.dateTime,
                }
            }
        })

        return {"message": "Date added!"}
    }

    public async deleteDate(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $pull: {
                "dates.dates": {
                    dateID: data.dateID
                }
            }
        })
        return {"message": "Date deleted!"}
    }

    public async editDate(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        await collection.updateOne({"_id": new ObjectId(data.userID), "dates.dates.dateID": data.dateID}, {
            $set: {
                "dates.dates.$.title": data.title,
                "dates.dates.$.description": data.description,
                "dates.dates.$.dateTime": data.dateTime,
            }
        })

        return {"message": "Date edited!"}
    }
}

export default DatesController;