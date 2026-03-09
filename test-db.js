
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'Set' : 'Not Set');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('students').select('*').limit(1);
        if (error) {
            console.error('Supabase Error:', error);
        } else {
            console.log('Connection successful, data:', data);
        }
    } catch (err) {
        console.error('Exception:', err);
    }
}

testConnection();
