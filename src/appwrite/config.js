import conf from  '../conf.js';
import { Client, Databases, Storage, Query, ID } from 'appwrite';

class Service{
   client = new Client();
   databases;
   bucket;

   constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client)
   }

   //post related method
   async createPost({title, slug, content, featureImage, userId, status}){
    try {
       return await this.databases.createDocument(conf.appwriteDatabasetId, conf.appwriteCollectionId, slug, {title, content, featureImage, status, userId})
    }
    catch(error){
        throw error;
    }
   }

   async postsList(){
    try{
        return  await this.databases.listDocuments( conf.appwriteDatabasetId, conf.appwriteCollectionId ) ;
    }
    catch(error){
        throw error;
    }
   }

   async getDocument(slug){
    try{
        return  await this.databases.getDocument( conf.appwriteDatabasetId, conf.appwriteCollectionId, slug, [ Query.equal('status', 'active')] ) ;
    }
    catch(error){
        throw error;
    }
   }

   async updatePost(slug, {title, content, featureImage, status}){
    try{
        return  await databases.updateDocument( conf.appwriteDatabasetId, conf.appwriteCollectionId, conf.appwrite, slug, {title, content, featureImage, status} );
    }
    catch(error){
        throw error;
    }
   }

   async deletePost(slug){
    try{
       await this.databases.deleteDocument(conf.appwriteDatabasetId, conf.appwriteCollectionId, slug);
       return true;
    }
    catch(error){
      throw error;
    }
   }

   //file related methods
   async uploadFile(file){
    try{
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file );
       
    }
    catch(error){
      return false;
    }
   }

   async deleteFile(fileId){
    try{
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
       return true;
    }
    catch(error){
      return false;
    }
   }

   async getFilePreview(fileId){
    try{
      return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
    catch(error){
      return false;
    }
   }
}

const service = new Service()
export default service;