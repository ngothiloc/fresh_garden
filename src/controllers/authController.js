const axios = require("axios");

// URL API
const API_URL = "http://localhost:3000/users";

/**
 * GET /signUp - Hiển thị form đăng ký
 */
exports.getSignIn = (req, res) => {
    res.render("signIn", { error: null }); // Đảm bảo error được định nghĩa
};

/**
 * POST /signIn - Xử lý đăng ký thông qua API
 */
exports.postSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Logic kiểm tra đăng nhập
        const isValid = email === "test@example.com" && password === "password"; // Thay bằng logic thật

        if (isValid) {
            // Đăng nhập thành công
            return res.redirect("/");
        } else {
            // Thông tin không đúng
            return res.render("signIn", { error: "Email hoặc mật khẩu không đúng." });
        }
    } catch (error) {
        // Lỗi hệ thống
        return res.render("signIn", {
            error: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
        });
    }
};

/**
 * POST /signUp - Xử lý đăng ký thông qua API
 */
exports.postSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Gửi dữ liệu tới API để đăng ký người dùng
        const response = await axios.post(API_URL, {
            name,
            email,
            password,
        });

        // Kiểm tra nếu đăng ký thành công (HTTP status 201 - Created)
        if (response.status === 201) {
            // Đăng ký thành công, chuyển hướng đến trang đăng nhập
            return res.redirect("/signIn");
        } else {
            // Nếu có lỗi từ API, hiển thị thông báo
            return res.render("signUp", { error: "Đã xảy ra lỗi. Vui lòng thử lại." });
        }
    } catch (error) {
        // Xử lý lỗi (ví dụ: email đã tồn tại hoặc lỗi hệ thống)
        let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        if (error.response && error.response.status === 400) {
            errorMessage = "Email đã tồn tại. Vui lòng sử dụng email khác.";
        }

        // Hiển thị thông báo lỗi cho người dùng
        res.render("signUp", { error: errorMessage });
    }
};

/**
 * GET /signIn - Hiển thị form đăng nhập
 */
exports.getSignUp = (req, res) => {
    res.render("signUp", { error: null }); // Đảm bảo error được định nghĩa
};