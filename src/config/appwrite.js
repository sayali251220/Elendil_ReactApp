

// src/config/appwrite.js
import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('67bf24280004e33ed354'); // Your Appwrite project ID

export const account = new Account(client); 
export const databases = new Databases(client); // ✅ Add the database instance

