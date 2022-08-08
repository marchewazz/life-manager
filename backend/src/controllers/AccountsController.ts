import crypto from 'crypto';

import MongoDBClient from "../utilities/MongoDBClient";
import createRandomString from '../utilities/CreateRandomString';
import { ObjectId } from 'mongodb';

class AccountsController {
    public async registerAccounts(req: any, res: any) {
        const userData = req.body;
        userData.accountPassword = crypto.createHash('sha256').update(userData.accountPassword).digest('base64');
   
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        const accountsWithPassedEmail = await collection.find({"accountEmail": userData.accountEmail}).toArray();
        if (!accountsWithPassedEmail.length) {
            await collection.insertOne(Object.assign(userData, {"tokens": []}));
            res.status(200).send({"message": "You have been registered"})
        } else {
            res.status(200).send({"message": "You already have account"})
        }
    }

    public async loginAccount(req: any, res: any) {
        const userData = req.body;
        userData.accountPassword = crypto.createHash('sha256').update(userData.accountPassword).digest('base64');
        
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        const accountsWithPassedEmail = await collection.find({"accountEmail": userData.accountEmail}).toArray();
        
        if (!accountsWithPassedEmail.length) {
            res.status(200).send({"message": "You dont have an account"})
        } else {
            if (accountsWithPassedEmail[0].accountPassword != userData.accountPassword) {
                res.status(200).send({"message": "Wrong password"})
            } else {
                const token: string = createRandomString(24);
                await collection.updateOne({"accountEmail": userData.accountEmail}, { "$push": 
                    {
                        "tokens": {
                            "token": token,
                            "expiringDate": new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
                        }
                    }
                })
                res.status(200).send({"message": "Logged", "token": token})
            }
            
        }
    }

    public async editUserData(data: any) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");

        collection.updateOne({"_id": new ObjectId(data.accountID)}, {
            $set: {
                accountEmail: data.accountEmail,
                accountName: data.accountName
            }
        })

        return {"message": "User edited!"}
    }
}

export default AccountsController;