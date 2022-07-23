import MongoDBClient from "../utilities/MongoDBClient";
import crypto from 'crypto';

class AccountsController {
    public async registerAccounts(req: any, res: any) {
        const userData = req.body;
        userData.accountPassword = crypto.createHash('sha256').update(userData.accountPassword).digest('base64');
        console.log(userData);
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        const accountsWithPassedEmail = await collection.find({"accountEmail": userData.accountEmail}).toArray();
        if (!accountsWithPassedEmail.length) {
            await collection.insertOne(userData);
            res.status(200).send({"message": "You have been registered"})
        } else {
            res.status(200).send({"message": "You already have account"})
        }
    }
}

export default AccountsController;