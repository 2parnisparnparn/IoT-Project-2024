// api.js
const API_BASE_URL = 'http://localhost:3000';

// Function to add a user
async function CreateUser(phoneNumber, password, fullName, credit) {
    const response = await fetch(`${API_BASE_URL}/add-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber, password, full_name: fullName, credit }),
    });

    const result = await response.text();
    return result;
}

// Function to check if the user exists by phone number
async function checkUserExists(phoneNumber) {
    try {
        const response = await fetch(`${API_BASE_URL}/users?phone_number=${phoneNumber}`);
        return response; // ส่งกลับ response สำหรับการตรวจสอบในฟังก์ชันที่เรียก
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Connection error'); // เก็บข้อผิดพลาด
    }
}