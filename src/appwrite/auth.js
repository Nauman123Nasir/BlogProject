import conf from  '../conf.js';
import {Client, Account, ID} from 'appwrite'

export class AuthService{
    client = new Client()
    Account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.Account = new Account(this.Client)
    }

    async createAccount({email, passowrd, name}){
       try {
          const userAccount =  await this.Account.create(ID.unique(), email, passowrd, name);
          if(userAccount){
            return this.login(email, passowrd)
          }
          else{
            return userAccount;
          }
       }
       catch(error){
          throw error;
       }
    }

    async login(email, passowrd){
        try{
           return await this.Account.createEmailSession(email, passowrd);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{

            return await this.Account.get()
        }
        catch(error){
            throw error
        }
        return null;
    }

    async logOut(){
        try{
           await this.Account.deleteSessions();
        }
        catch(error){
           throw error;
        }
    }
}

const authService = new AuthService();

export default authService;