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


async function createUser(userData, createUserApiUrl = `${API_BASE_URL}/create-user`) {
    try {
        console.log(createUserApiUrl);

        const response = await fetch(createUserApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Handle different response statuses
        if (response.status === 204) {
            return { success: true }; // User created successfully, no content to return
        } else if (!response.ok) {
            // Throw an error for any other non-success status
            throw new Error(`Failed to create user: ${response.statusText}`);
        }

        // If response is 200, parse the JSON result
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error creating user: ', error);
        throw new Error('Failed to create user');
    }
}


// Function to fetch bottle credit
async function fetchBottleCredit(bottleType) {
    try {
        const response = await fetch(`${API_BASE_URL}/bottle/${bottleType}`);
        const data = await response.json();
        if (data.bottles && data.bottles.length > 0) {
            const bottle = data.bottles[0];
            return {
                carbon_credit: bottle.carbon_credit,
                bottle_id: bottle.bottle_id
            };
        }
        return { carbon_credit: 0, bottle_id: null };
    } catch (error) {
        console.error("Error fetching bottle credit:", error);
        return { carbon_credit: 0, bottle_id: null };
    }
}


// Function to add a bill
async function addBill(billData, addBillApiUrl = `${API_BASE_URL}/add-bill`) {
    try {
        const response = await fetch(addBillApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billData)
        });

        if (!response.ok) {
            throw new Error(`Failed to add bill: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error adding bill:", error);
        throw new Error("Failed to add bill");
    }
}

async function getCradit(phoneNumber) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${phoneNumber}`);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json(); 
        return data[0].credit;
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Connection error');
    }
}