import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get Supabase URL and API key from environment variables
const supabaseURL = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseURL,supabaseKey)


export {supabase}
