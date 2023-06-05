const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
	newsId: { type: mongoose.Schema.Types.ObjectId },
	title: { type: String, required: true },
	subtitle: { type: String, required: true },
},
	{ timestamps: true });

userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}

});

const News = mongoose.model("News", newsSchema);

module.exports = News;