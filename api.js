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

// Function to fetch bottle credit
async function fetchBottleCredit(bottleType) {
    try {
        const response = await fetch(`${API_BASE_URL}/bottle/${bottleType}`);
        const data = await response.json();
        if (data.bottles && data.bottles.length > 0) {
            return data.bottles[0].carbon_credit;
        }
        return 0;
    } catch (error) {
        console.error("Error fetching bottle credit:", error);
        return 0;
    }
}

// Function to add a bill
async function addBill(billData, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error adding bill:", response);
            return null;
        }
    } catch (error) {
        console.error("Error adding bill:", error);
        return null;
    }
}
