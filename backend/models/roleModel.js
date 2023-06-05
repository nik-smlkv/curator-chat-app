const mongoose = require("mongoose");
const {Schema} = require("mongoose")


const roleSchema = new Schema({
   role: {type: mongoose.Schema.Types.ObjectId, unique: true, default: "Студент"},
})

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;