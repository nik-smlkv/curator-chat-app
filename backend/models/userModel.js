const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	pic: {
		type: String,
		default: "https://thumbs.dreamstime.com/b/profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-white-background-profile-107327860.jpg"
	},
	role: [{type:  String, ref: 'Role'}],
	groupId: { type: String, required: true, default: '10702219' },
},
	{ timestamps: true });
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;