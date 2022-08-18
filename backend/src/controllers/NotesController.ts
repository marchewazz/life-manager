import { ObjectId } from "mongodb";
import MongoDBClient from "../utilities/MongoDBClient";

import createRandomString from "../utilities/CreateRandomString";

class NotesController {
    public async sendNote(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        while (true) {
            var randomString = createRandomString(10);
            if (!(await collection.find({"notes.$.noteID": randomString}).toArray()).length) break;
        }
        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $push: {
                notes: {
                    noteID: randomString,
                    title: data.title,
                    description: data.description,
                    color: data.color
                }
            }
        })

        return {"message": "Note added!"}
    }
    public async deleteNode(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");        
        await collection.updateOne({"_id": new ObjectId(data.userID)}, {
            $pull: {
                notes: {
                    noteID: data.noteID
                }
            }
        })
        return {"message": "Note deleted!"}
    }
    public async editNote(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");    
        await collection.updateOne({"_id": new ObjectId(data.userID), "notes.noteID": data.noteID}, {
            $set: {
                "notes.$.title": data.title,
                "notes.$.description": data.description,
            }
        })

        return {"message": "Note edited!"}
    }
}

export default NotesController;