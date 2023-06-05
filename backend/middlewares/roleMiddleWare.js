/* const dotenv = require('dotenv');


dotenv.config();

const roleMiddleWare = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(403).json({ message: "Пользователь не авторизован" })
			}
			const { roles: roleName } = jwt.verify(token, secret)
			let hasRole = false
			roleName.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
			})
			if (!hasRole) {
				return res.status(403).json({ message: "У вас нет доступа" })
			}
			next();
		} catch (e) {
			console.log(e)
			return res.status(403).json({ message: "Пользователь не авторизован" })
		}
	}
};

module.exports = { roleMiddleWare }; */