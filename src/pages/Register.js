"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var signup_png_1 = __importDefault(require("../assets/signup.png"));
require("../index.css");
var Register = function () {
    var _a = (0, react_1.useState)({
        name: '',
        email: '',
        username: '',
        password: '',
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)({
        name: '',
        email: '',
        username: '',
        password: '',
    }), errors = _b[0], setErrors = _b[1];
    var navigate = (0, react_router_dom_1.useNavigate)(); // Initialize useNavigate
    var handleChange = function (e) {
        var _a, _b;
        var _c = e.target, name = _c.name, value = _c.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
        setErrors(__assign(__assign({}, errors), (_b = {}, _b[name] = '', _b)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var isValid = true;
        var newErrors = __assign({}, errors);
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
            isValid = false;
        }
        setErrors(newErrors);
        if (isValid) {
            console.log('Form data submitted:', formData);
            navigate('/dashboard'); // Redirect to dashboard
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "register-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "left-section", children: [(0, jsx_runtime_1.jsx)("img", { src: signup_png_1.default, alt: "Join SkillSync Community" }), (0, jsx_runtime_1.jsx)("h2", { children: "Join SkillSync Community" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "right-section", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Sign Up" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: formData.name, onChange: handleChange }), errors.name && (0, jsx_runtime_1.jsx)("p", { className: "error", children: errors.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", name: "email", value: formData.email, onChange: handleChange }), errors.email && (0, jsx_runtime_1.jsx)("p", { className: "error", children: errors.email })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "username", value: formData.username, onChange: handleChange }), errors.username && (0, jsx_runtime_1.jsx)("p", { className: "error", children: errors.username })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "password", value: formData.password, onChange: handleChange }), errors.password && (0, jsx_runtime_1.jsx)("p", { className: "error", children: errors.password })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "Register" })] })] })] }));
};
exports.default = Register;
