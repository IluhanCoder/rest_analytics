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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_service_1 = __importDefault(require("./analytics-service"));
exports.default = new /** @class */ (function () {
    function AnalyticsController() {
    }
    AnalyticsController.prototype.transactionsApriori = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, minSupport, maxSupport, minConfidence, maxConfidence, category, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, minSupport = _a.minSupport, maxSupport = _a.maxSupport, minConfidence = _a.minConfidence, maxConfidence = _a.maxConfidence, category = _a.category;
                        return [4 /*yield*/, analytics_service_1.default.transactionsApriori(minSupport, maxSupport, minConfidence, maxConfidence, category)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).send(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsController.prototype.predictSales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, productId, months, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, productId = _a.productId, months = _a.months;
                        return [4 /*yield*/, analytics_service_1.default.predictSales(productId, months)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(500).send(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsController.prototype.monthlySales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startMonth, endMonth, result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, startMonth = _a.startMonth, endMonth = _a.endMonth;
                        return [4 /*yield*/, analytics_service_1.default.monthlyTransactions(startMonth, endMonth)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_3 = _b.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(500).send(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsController.prototype.averageTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startMonth, endMonth, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, startMonth = _a.startMonth, endMonth = _a.endMonth;
                        return [4 /*yield*/, analytics_service_1.default.averageTransaction(startMonth, endMonth)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.status(500).send(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsController.prototype.monthlyTransactionCost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startMonth, endMonth, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, startMonth = _a.startMonth, endMonth = _a.endMonth;
                        console.log(startMonth);
                        console.log(endMonth);
                        return [4 /*yield*/, analytics_service_1.default.monthlyTransactionSum(startMonth, endMonth)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_5 = _b.sent();
                        console.log(error_5);
                        return [2 /*return*/, res.status(500).send(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsController.prototype.monthlyProductSales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = req.body.productId;
                        return [4 /*yield*/, analytics_service_1.default.monthlyProductSales(productId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send(result)];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, res.status(500).send(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnalyticsController;
}());
