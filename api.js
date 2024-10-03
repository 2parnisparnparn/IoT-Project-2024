// api.js
const API_BASE_URL = 'http://localhost:3000/api';

// Function to check if the user exists by phone number
async function checkUserExists(phoneNumber) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${phoneNumber}`);
        return response; 
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Connection error');
    }
}