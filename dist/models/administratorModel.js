"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const administratorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Pleace add a name"],
    },
    email: {
        type: String,
        required: [true, "Pleace add an emial"],
    },
    password: {
        type: String,
        required: [true, "Pleace add a password"],
    },
    avater: {
        type: String,
        required: false,
    },
});
const administratorModel = (0, mongoose_1.model)("Administrator", administratorSchema);
exports.default = administratorModel;
