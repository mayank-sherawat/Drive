
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

module.exports = supabaseAdmin;