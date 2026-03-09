import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// This handles the POST request to /api/students/register
router.post('/register', async (req, res) => {
  // 1. Destructure all fields from the React form body
  const {
    firstName, lastName, dateOfBirth, gender, email, phone,
    address, city, state, zipCode, country,
    program, semester, previousSchool, gpa,
    emergencyContactName, emergencyContactPhone, emergencyContactRelation
  } = req.body;

  // 2. Basic Validation: Check if core required fields exist
  if (!firstName || !lastName || !email || !program) {
    return res.status(400).json({
      error: "Missing required fields: First Name, Last Name, Email, and Program are mandatory."
    });
  }

  try {
    // 3. Insert data into your Supabase 'students' table 
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          // 1. Map 'dateOfBirth' from form to 'dob' column
          dob: dateOfBirth,
          gender,
          email,
          phone,
          // 2. Map 'address' from form to 'street_address' column
          street_address: address,
          city,
          state,
          zip_code: zipCode,
          country,
          program,
          // 3. Keep 'starting_semester' column mapped to 'semester' from form
          starting_semester: semester,
          previous_school: previousSchool,
          previous_gpa: parseFloat(gpa) || 0,
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          // 4. Map 'emergencyContactRelation' from form to 'emergency_relationship' column
          emergency_relationship: emergencyContactRelation
        }
      ])
      .select(); // Returns the inserted data for confirmation

    // 4. Handle Supabase-specific errors (like duplicate emails)
    if (error) throw error;

    // 5. Success Response
    res.status(201).json({
      message: 'Student successfully registered!',
      student: data[0]
    });

  } catch (error) {
    // Catch-all for database or server errors
    console.error("Supabase Error:", error.message);
    res.status(500).json({
      error: "Database connection failed. Please try again later."
    });
  }
});

export default router;