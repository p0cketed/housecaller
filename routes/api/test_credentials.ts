import { config } from 'https://deno.land/x/dotenv/mod.ts';

// Load environment variables
const env = config();

// Your WhenIWork API key and user credentials
const API_KEY = env.WIW_KEY;
const EMAIL = env.WIW_EMAIL;
const PASSWORD = env.WIW_PASSWORD;
const BASE_URL = 'https://api.wheniwork.com/2';

async function testCredentials() {
  try {
    // Log in to the WhenIWork API
    const loginEndpoint: string = '/login';

    const loginResponse = await fetch(`${BASE_URL}${loginEndpoint}`, {
      method: 'POST',
      headers: {
        'W-Token': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: EMAIL, password: PASSWORD }),
    });

    if (!loginResponse.ok) {
      console.error('Login failed.');
      console.error('Status:', loginResponse.status);
      console.error('Response:', await loginResponse.text());
      return;
    }

    const { token } = await loginResponse.json();

    // Make an API request using the API key and user token
    const testEndpoint: string = '/users';

    const response = await fetch(`${BASE_URL}${testEndpoint}`, {
      method: 'GET',
      headers: {
        'W-Token': API_KEY,
        'W-UserToken': token,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API request successful!');
      console.log('Response:', data);
    } else {
      console.error('API request failed.');
      console.error('Status:', response.status);
      console.error('Response:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCredentials();