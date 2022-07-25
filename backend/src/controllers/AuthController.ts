import MongoDBClient from "../utilities/MongoDBClient";

class AuthController {
    public async getUserData(token: string) {
        const collection = MongoDBClient.db("life-manager").collection("accounts");
        const accountsWithPassedEmail = await collection.find({"tokens.token": token}, {projection: {"accountPassword": 0, "tokens": 0}}).toArray();        
        if (!accountsWithPassedEmail.length) {
            return {"valid": false}
        } else {
            return {"valid": true, "userData": accountsWithPassedEmail[0]}
        }
    }
}

export default AuthController;