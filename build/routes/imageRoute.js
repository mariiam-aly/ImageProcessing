"use strict";
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
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const imgProcessing_1 = __importDefault(require("../fuctions/imgProcessing"));
const routes = express_1.default.Router();
/*this end-point acts depending on the validity of the parameters
and the existence of the same required image of same  dimentions */
/*displayes either: error, new resized image, an already existing resized image */
routes.get('/images', (req, res) => {
    const imagePath = `/Users/mariamaly/projects/ImageProcessing/assets/full/${req.query.fileName}.jpeg`;
    if (!fs.existsSync(imagePath)) {
        res.send('File name does not exist');
    }
    else if (!(req.query.width >= 0) ||
        !(req.query.height >= 0)) {
        res.send('please enter valid dimentions');
    }
    else {
        const newImageName = `${req.query.fileName}${req.query.width}x${req.query.height}`;
        const newImagePath = `/Users/mariamaly/projects/ImageProcessing/assets/thumb/${newImageName}.jpeg`;
        if (fs.existsSync(newImagePath)) {
            res.sendFile(newImagePath);
        }
        else {
            /*  setTimeout(function () {
                res.sendFile(newImagePath);
              }, 1000);*/
            res.sendFile(newImagePath);
            (0, imgProcessing_1.default)(`./assets/full/${req.query.fileName}.jpeg`, `./assets/thumb/${newImageName}.jpeg`);
        }
    }
});
exports.default = routes;
