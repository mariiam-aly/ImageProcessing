"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
/*this function takes the path of the file required to be resized
/and the path intended for the new resized image*/
function reSize(fileName, newImage) {
    (0, sharp_1.default)(fileName)
        .resize(300, 200)
        .toFile(newImage);
    return newImage;
}
exports.default = reSize;
