/*
Run: node scripts/seed.js
Make sure MONGO_URI is set in environment.
This creates an admin user (username: admin, password: admin123) and sample categories.
*/
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  const admin = await User.findOne({ username: 'admin' });
  if(!admin){
    await User.create({ username: 'admin', password: 'admin123', role: 'admin' });
    console.log('Admin created: admin / admin123');
  } else {
    console.log('Admin already exists');
  }
  const names = ['Electronics','Clothing','Books'];
  for(const n of names){
    const exists = await Category.findOne({ name: n });
    if(!exists) await Category.create({ name: n });
  }
  console.log('Seed done');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
