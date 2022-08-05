import { ObjectId } from "mongodb";
import MongoDBClient from "../utilities/MongoDBClient";

import createRandomString from "../utilities/CreateRandomString";

class NotesController {
    public async sendNote(note: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        while (true) {
            var randomString = createRandomString(10);
            if (!(await collection.find({"notes.$.noteID": randomString}).toArray()).length) break;
        }
        await collection.updateOne({"_id": new ObjectId(note.userID)}, {
            $push: {
                notes: {
                    noteID: randomString,
                    title: note.title,
                    description: note.description,
                    color: note.color
                }
            }
        })
    }
    public async deleteNode(note: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");        
        await collection.updateOne({"_id": new ObjectId(note.userID)}, {
            $pull: {
                notes: {
                    noteID: note.noteID
                }
            }
        })
    }
}

export default NotesController;