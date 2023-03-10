"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdministratoreData = exports.loginAdministrator = exports.registerAdministrator = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const administratorModel_1 = __importDefault(require("../models/administratorModel"));
/**
 * @description          Register new administrator
 * @route                     POST /api/administrator
 * @access                 Public
 */
const registerAdministrator = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const administratorExists = yield administratorModel_1.default.findOne({ email });
    if (administratorExists) {
        res.status(400);
        throw new Error("Administrator already exists");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const administrator = yield administratorModel_1.default.create({
        name,
        email,
        password: hashedPassword,
        avater: "defaultAvater.png",
    });
    if (administrator) {
        res.status(200).json({
            _id: administrator.id,
            name: administrator.name,
            email: administrator.email,
            token: (0, generateToken_1.default)(administrator.id, 1, "d"),
            avater: "defaultAvater.png",
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid administrator data");
    }
}));
exports.registerAdministrator = registerAdministrator;
/**
 * @description        Authenticate ad administrator
 * @router                 POST /api/administrator/login
 * @access               Public
 */
const loginAdministrator = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const administrator = yield administratorModel_1.default.findOne({ email });
    if (administrator &&
        (yield bcryptjs_1.default.compare(password, administrator.password))) {
        res.status(200).json({
            _id: administrator.id,
            name: administrator.name,
            email: administrator.email,
            token: (0, generateToken_1.default)(administrator.id, 1, "d"),
            avater: administrator.avater,
        });
    }
    else {
        res.status(400).json({ reason: "Email or password wrong" });
        throw new Error("Invalid credentials");
    }
}));
exports.loginAdministrator = loginAdministrator;
/**
 * @desc            Get administrator data
 * @route           GET /api/administrator/administratorData
 * @access        Public
 */
const getAdministratoreData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { _id, name, email, avater } = yield administratorModel_1.default.findById(req.body.administrator.id);
    res.status(200).json({
        id: _id,
        name,
        email,
        avater,
    });
}));
exports.getAdministratoreData = getAdministratoreData;
