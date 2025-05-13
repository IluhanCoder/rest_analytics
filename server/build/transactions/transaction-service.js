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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_client_1 = __importDefault(require("../prisma-client"));
exports.default = new /** @class */ (function () {
    function TransactionService() {
    }
    TransactionService.prototype.createTransaction = function (date, productData) {
        return __awaiter(this, void 0, void 0, function () {
            var createdTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_client_1.default.transaction.create({
                            data: {
                                date: date,
                                products: {
                                    create: productData.map(function (_a) {
                                        var productId = _a.productId, quantity = _a.quantity;
                                        return ({
                                            product: {
                                                connect: { id: productId },
                                            },
                                            quantity: quantity,
                                        });
                                    }),
                                },
                            },
                            include: {
                                products: {
                                    include: {
                                        product: true,
                                    },
                                },
                            },
                        })];
                    case 1:
                        createdTransaction = _a.sent();
                        return [2 /*return*/, createdTransaction];
                }
            });
        });
    };
    TransactionService.prototype.fetchTransactions = function (filter, productName) {
        return __awaiter(this, void 0, void 0, function () {
            function getTransactionsWithCost(filter, productName) {
                return __awaiter(this, void 0, void 0, function () {
                    var transactions, transactionsWithCost;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                    select: {
                                        id: true,
                                        date: true,
                                        products: {
                                            select: {
                                                quantity: true,
                                                product: {
                                                    select: {
                                                        price: true,
                                                        name: true
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    where: {
                                        date: {
                                            gte: filter.date.gte,
                                            lte: filter.date.lte
                                        }
                                    }
                                })];
                            case 1:
                                transactions = _a.sent();
                                if (productName)
                                    transactions = transactions.filter(function (transaction) {
                                        return transaction.products.some(function (product) { return product.product && product.product.name.toUpperCase().includes(productName.toUpperCase()); });
                                    });
                                transactionsWithCost = [];
                                transactions.forEach(function (transaction) {
                                    if (transaction.date) {
                                        var totalCost = transaction.products.reduce(function (acc, product) {
                                            if (product.product && product.quantity) {
                                                return acc + product.product.price * product.quantity;
                                            }
                                            return acc;
                                        }, 0);
                                        transactionsWithCost.push({
                                            id: transaction.id,
                                            date: transaction.date,
                                            products: transaction.products,
                                            totalCost: totalCost,
                                        });
                                    }
                                });
                                return [2 /*return*/, transactionsWithCost];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, getTransactionsWithCost(filter, productName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TransactionService.prototype.updateTransaction = function (transactionId, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_client_1.default.transaction.update({
                                where: { id: transactionId },
                                data: newData
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.deleteTransaction = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_client_1.default.transaction.delete({
                                where: { id: transactionId }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.filterTransactions = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                where: __assign({}, filter)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // async getTransactionByProductName (productName: string) {
    //   const transactions = await prismaClient.transaction.findMany({
    //     where: {
    //       products: {
    //         some: {
    //           product: {
    //             name: {
    //               equals: productName,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    //   return transactions;
    // }
    TransactionService.prototype.fetchRangeSales = function (productId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var transactions, monthlySalesMap, transactions_1, transactions_1_1, transaction, transactionDate, monthYear, productQuantity, monthlySales;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                            include: {
                                products: {
                                    where: {
                                        productId: productId
                                    }
                                },
                            },
                        })];
                    case 1:
                        transactions = (_c.sent()).filter(function (transaction) { return transaction.products.length > 0; });
                        monthlySalesMap = new Map();
                        try {
                            // Iterate through transactions and accumulate sales by month
                            for (transactions_1 = __values(transactions), transactions_1_1 = transactions_1.next(); !transactions_1_1.done; transactions_1_1 = transactions_1.next()) {
                                transaction = transactions_1_1.value;
                                transactionDate = transaction.date;
                                if (transactionDate) {
                                    monthYear = transactionDate.toISOString().slice(0, 7);
                                    productQuantity = ((_a = transaction.products.find(function (p) { return p.productId === productId; })) === null || _a === void 0 ? void 0 : _a.quantity) || 0;
                                    if (!monthlySalesMap.has(monthYear)) {
                                        monthlySalesMap.set(monthYear, 0);
                                    }
                                    monthlySalesMap.set(monthYear, monthlySalesMap.get(monthYear) + productQuantity);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (transactions_1_1 && !transactions_1_1.done && (_b = transactions_1.return)) _b.call(transactions_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        monthlySales = Array.from(monthlySalesMap).map(function (_a) {
                            var _b = __read(_a, 2), month = _b[0], sales = _b[1];
                            return ({
                                month: month,
                                sales: sales,
                            });
                        });
                        return [2 /*return*/, monthlySales];
                }
            });
        });
    };
    return TransactionService;
}());
