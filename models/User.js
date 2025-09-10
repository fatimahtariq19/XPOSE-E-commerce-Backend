const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true, minlength: 6, select: false },
role: { type: String, enum: ['user', 'admin'], default: 'user', select: true }
},
{ timestamps: true }
);


userSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});


userSchema.methods.comparePassword = function (candidate) {
return bcrypt.compare(candidate, this.password);
};


module.exports = mongoose.model('User', userSchema);




// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: { type: String, required: true },

//     // 👑 Role-based access: 'admin' or 'user'
//     role: {
//       type: String,
//       enum: ['admin', 'user'],
//       default: 'user',
//     },

//     address: { type: String },
//     phone: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// // 🔐 Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // 🔎 Compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // ✅ Export User model
// module.exports = mongoose.model("User", userSchema);
