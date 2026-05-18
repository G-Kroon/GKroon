// Replace with your Supabase project credentials
const SUPABASE_URL = 'https://jtkxqqdehlrpongspuhx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0a3hxcWRlaGxycG9uZ3NwdWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODc0MzgsImV4cCI6MjA2MzA2MzQzOH0.X0nCE7UdWIOF7DDkIffbs7dlU7-hUCd-ppOW5A1-DFQ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function validateEmail(email) {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateWhatsApp(number) {
  // Accepts digits only, length 8-15 (customize as needed)
  return /^\d{8,15}$/.test(number);
}

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const whatsapp = document.getElementById('signup-whatsapp').value.trim();
  const country = document.getElementById('signup-country').value;
  const messageDiv = document.getElementById('signup-message');

  // --- Frontend Validation ---
  if (name.length < 2) {
    messageDiv.textContent = 'Please enter your full name (at least 2 characters).';
    messageDiv.className = 'error';
    return;
  }
  if (!validateEmail(email)) {
    messageDiv.textContent = 'Please enter a valid email address.';
    messageDiv.className = 'error';
    return;
  }
  if (password.length < 6) {
    messageDiv.textContent = 'Password must be at least 6 characters.';
    messageDiv.className = 'error';
    return;
  }
  if (!validateWhatsApp(whatsapp)) {
    messageDiv.textContent = 'Please enter a valid WhatsApp number (digits only, 8-15 digits).';
    messageDiv.className = 'error';
    return;
  }
  if (!country) {
    messageDiv.textContent = 'Please select your country.';
    messageDiv.className = 'error';
    return;
  }

  // --- Supabase API Calls (only if validation passes) ---
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, whatsapp, country } }
  });

  if (error) {
    messageDiv.textContent = error.message;
    messageDiv.className = 'error';
    return;
  }

  // Optionally insert user to custom table
  const { error: insertError } = await supabase
    .from('users')
    .insert([{ name, email, whatsapp, country, auth_user_id: data.user.id }]);

  if (insertError) {
    messageDiv.textContent = 'Signup succeeded but failed to save user info: ' + insertError.message;
    messageDiv.className = 'error';
    return;
  }

  messageDiv.textContent = 'Signup successful! Please check your email for confirmation.';
  messageDiv.className = 'success';
});
