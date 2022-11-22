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
const imgProcessing_1 = __importDefault(require("../fuctions/imgProcessing"));
const imageRoute_1 = __importDefault(require("../routes/imageRoute"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const main = (0, supertest_1.default)(index_1.default);
const route = (0, supertest_1.default)(imageRoute_1.default);
describe("resize image", () => {
    it("takes image path and returns resized image path", () => {
        expect((0, imgProcessing_1.default)('/Users/mariamaly/projects/ImageProcessing/assets/full/fjord.jpeg', '/Users/mariamaly/projects/ImageProcessing/assets/thumb/fjord.jpeg')).toBe('/Users/mariamaly/projects/ImageProcessing/assets/thumb/fjord.jpeg');
    });
});
describe("end points", () => {
    it('server is running', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield main.get('/api');
        expect(response.status).toBe(200);
    }));
    it('create new image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield route.get('/api/images?fileName=fjord&width=200&height=200');
        expect(response.status).toBe(200);
    }));
    it('return error for user to enter correct image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield route.get('/api/images?/fileName=fjordd');
        expect(response.status).toBe(200);
    }));
});
