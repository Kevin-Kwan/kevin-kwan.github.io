import { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT, importJWK } from 'jose';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username cannot be empty.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password cannot be empty.' });
  }

  // Retrieve the username and hashed password from the environment variables
  const storedUsername = process.env.SITE_USERNAME;
  const storedHashedPassword = process.env.SITE_HASHED_PASSWORD;

  if (username !== storedUsername) {
    return res.status(400).json({ message: 'Username does not exist.' });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, storedHashedPassword);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid password.' });
  }

  // Generate a JWT token
  const secretKey = process.env.JWT_SECRET;
  const key = await importJWK({ kty: 'oct', k: secretKey, alg: 'HS256' });

  const payload = {
    username: storedUsername,
    iat: Math.floor(Date.now() / 1000), // current time in seconds
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires 1 hour
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(key);

  // Send the token in the response
  return res.status(200).json({ token });
}
export const runtime = 'edge';
