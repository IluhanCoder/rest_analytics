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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_service_1 = __importDefault(require("../transactions/transaction-service"));
var simple_statistics_1 = __importDefault(require("simple-statistics"));
var prisma_client_1 = __importDefault(require("../prisma-client"));
var analytics_helpers_1 = require("./analytics-helpers");
exports.default = new /** @class */ (function () {
    function AnalyticsService() {
    }
    AnalyticsService.prototype.transactionsApriori = function (minSupport, maxSupport, minConfidence, maxConfidence, category) {
        return __awaiter(this, void 0, void 0, function () {
            function fetchTransactions() {
                return __awaiter(this, void 0, void 0, function () {
                    var transactionData;
                    return __generator(this, function (_a) {
                        transactionData = [];
                        transactions.forEach(function (transaction) {
                            var items = transaction.products.filter(function (product) { if (!product.product)
                                return false;
                            else
                                return !category || product.product.category === category; });
                            items = items.map(function (product) { if (product.product)
                                return product.product.id; });
                            if (items.length > 0)
                                transactionData.push(items);
                        });
                        return [2 /*return*/, transactionData];
                    });
                });
            }
            function findFrequentPairs(data, minSupport, minConfidence, maxSupport, maxConfidence) {
                return __awaiter(this, void 0, void 0, function () {
                    var itemFrequencies, data_1, data_1_1, transaction, transaction_1, transaction_1_1, item, frequentPairs, _a, _b, item1, _c, _d, item2, pairSupport, data_2, data_2_1, transaction, frequentPairs_1, frequentPairs_1_1, pair, frequentPairsWithInfo, frequentPairs_2, frequentPairs_2_1, pair, support, confidence, result, getProductData;
                    var e_1, _e, e_2, _f, e_3, _g, e_4, _h, e_5, _j, e_6, _k, e_7, _l;
                    var _this = this;
                    return __generator(this, function (_m) {
                        switch (_m.label) {
                            case 0:
                                itemFrequencies = new Map();
                                try {
                                    for (data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                        transaction = data_1_1.value;
                                        try {
                                            for (transaction_1 = (e_2 = void 0, __values(transaction)), transaction_1_1 = transaction_1.next(); !transaction_1_1.done; transaction_1_1 = transaction_1.next()) {
                                                item = transaction_1_1.value;
                                                if (!itemFrequencies.has(item)) {
                                                    itemFrequencies.set(item, 0);
                                                }
                                                itemFrequencies.set(item, itemFrequencies.get(item) + 1);
                                            }
                                        }
                                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                        finally {
                                            try {
                                                if (transaction_1_1 && !transaction_1_1.done && (_f = transaction_1.return)) _f.call(transaction_1);
                                            }
                                            finally { if (e_2) throw e_2.error; }
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (data_1_1 && !data_1_1.done && (_e = data_1.return)) _e.call(data_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                frequentPairs = [];
                                try {
                                    for (_a = __values(itemFrequencies.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        item1 = _b.value;
                                        if (itemFrequencies.get(item1) >= minSupport && itemFrequencies.get(item1) <= maxSupport) {
                                            try {
                                                for (_c = (e_4 = void 0, __values(itemFrequencies.keys())), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                    item2 = _d.value;
                                                    if (item1 !== item2 && itemFrequencies.get(item2) >= minSupport && itemFrequencies.get(item2) <= maxSupport) {
                                                        frequentPairs.push([item1, item2]);
                                                    }
                                                }
                                            }
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                                                }
                                                finally { if (e_4) throw e_4.error; }
                                            }
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                pairSupport = new Map();
                                try {
                                    for (data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                                        transaction = data_2_1.value;
                                        try {
                                            for (frequentPairs_1 = (e_6 = void 0, __values(frequentPairs)), frequentPairs_1_1 = frequentPairs_1.next(); !frequentPairs_1_1.done; frequentPairs_1_1 = frequentPairs_1.next()) {
                                                pair = frequentPairs_1_1.value;
                                                if (transaction.includes(pair[0]) && transaction.includes(pair[1])) {
                                                    if (!pairSupport.has(pair)) {
                                                        pairSupport.set(pair, 0);
                                                    }
                                                    pairSupport.set(pair, pairSupport.get(pair) + 1);
                                                }
                                            }
                                        }
                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                        finally {
                                            try {
                                                if (frequentPairs_1_1 && !frequentPairs_1_1.done && (_k = frequentPairs_1.return)) _k.call(frequentPairs_1);
                                            }
                                            finally { if (e_6) throw e_6.error; }
                                        }
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (data_2_1 && !data_2_1.done && (_j = data_2.return)) _j.call(data_2);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                                frequentPairsWithInfo = [];
                                try {
                                    for (frequentPairs_2 = __values(frequentPairs), frequentPairs_2_1 = frequentPairs_2.next(); !frequentPairs_2_1.done; frequentPairs_2_1 = frequentPairs_2.next()) {
                                        pair = frequentPairs_2_1.value;
                                        support = pairSupport.get(pair);
                                        confidence = support / itemFrequencies.get(pair[0]);
                                        if (confidence >= minConfidence && confidence <= maxConfidence) {
                                            frequentPairsWithInfo.push({
                                                pair: pair,
                                                support: support,
                                                confidence: confidence,
                                            });
                                        }
                                    }
                                }
                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                finally {
                                    try {
                                        if (frequentPairs_2_1 && !frequentPairs_2_1.done && (_l = frequentPairs_2.return)) _l.call(frequentPairs_2);
                                    }
                                    finally { if (e_7) throw e_7.error; }
                                }
                                // Step 5: Sort the rules by support and confidence
                                frequentPairsWithInfo.sort(function (a, b) {
                                    if (a.support !== b.support) {
                                        return b.support - a.support;
                                    }
                                    return b.confidence - a.confidence;
                                });
                                result = [];
                                getProductData = function (fp) { return __awaiter(_this, void 0, void 0, function () {
                                    var pair, product1, product2, newData;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                pair = fp.pair;
                                                return [4 /*yield*/, prisma_client_1.default.product.findUnique({ where: { id: pair[0] } })];
                                            case 1:
                                                product1 = _a.sent();
                                                return [4 /*yield*/, prisma_client_1.default.product.findUnique({ where: { id: pair[1] } })];
                                            case 2:
                                                product2 = _a.sent();
                                                newData = {
                                                    pair: [
                                                        product1,
                                                        product2
                                                    ],
                                                    support: fp.support,
                                                    confidence: fp.confidence
                                                };
                                                result = __spreadArray(__spreadArray([], __read(result), false), [newData], false);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                return [4 /*yield*/, Promise.all(frequentPairsWithInfo.map(function (fp) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, getProductData(fp)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    }); }); }))];
                            case 1:
                                _m.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            }
            var transactions, dataset, frequentPairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                            select: {
                                id: true,
                                date: true,
                                products: {
                                    select: {
                                        id: true,
                                        quantity: true,
                                        product: {
                                            select: {
                                                id: true,
                                                name: true,
                                                category: true,
                                                description: true,
                                                price: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                    case 1:
                        transactions = _a.sent();
                        return [4 /*yield*/, fetchTransactions()];
                    case 2:
                        dataset = _a.sent();
                        return [4 /*yield*/, findFrequentPairs(dataset, minSupport, minConfidence, maxSupport, maxConfidence)];
                    case 3:
                        frequentPairs = _a.sent();
                        return [2 /*return*/, (frequentPairs)];
                }
            });
        });
    };
    AnalyticsService.prototype.predictSales = function (productId, monthToPredict) {
        return __awaiter(this, void 0, void 0, function () {
            function predictMonthlyProductSales(productId, monthsToPredict) {
                return __awaiter(this, void 0, void 0, function () {
                    function formatDate(date) {
                        var year = date.getFullYear();
                        var month = (date.getMonth() + 1).toString().padStart(2, '0');
                        return "".concat(year, "-").concat(month);
                    }
                    var historicalSales, months, sales, monthIndexes, dataToLearn, regressionModel, predictedSales, i, nextMonthIndex, nextMonth, predictedSale;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetchHistoricalSales(productId)];
                            case 1:
                                historicalSales = _a.sent();
                                months = historicalSales.map(function (entry) { return entry.month; });
                                sales = historicalSales.map(function (entry) { return entry.sales; });
                                monthIndexes = months.map(function (month) { return Number(month.slice(-2)); });
                                dataToLearn = monthIndexes.map(function (index, i) {
                                    if (i === void 0) { i = 0; }
                                    return [index, sales[i++]];
                                });
                                regressionModel = simple_statistics_1.default.linearRegression(dataToLearn);
                                predictedSales = [];
                                for (i = 0; i < monthsToPredict; i++) {
                                    nextMonthIndex = months.length + i + 1;
                                    nextMonth = new Date();
                                    nextMonth.setMonth(nextMonth.getMonth() + i + 1);
                                    predictedSale = regressionModel.m * nextMonthIndex + regressionModel.b;
                                    predictedSales.push({
                                        month: formatDate(nextMonth),
                                        sales: Math.max(0, predictedSale), // Ensure predictions are non-negative
                                    });
                                }
                                return [2 /*return*/, predictedSales];
                        }
                    });
                });
            }
            var fetchHistoricalSales;
            var _this = this;
            return __generator(this, function (_a) {
                fetchHistoricalSales = function (productId) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, transaction_service_1.default.fetchRangeSales(productId)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, predictMonthlyProductSales(productId, monthToPredict)];
            });
        });
    };
    AnalyticsService.prototype.monthlyTransactions = function (startMonth, endMonth) {
        return __awaiter(this, void 0, void 0, function () {
            function getMonthlyTransactionInfo(startMonth, endMonth) {
                return __awaiter(this, void 0, void 0, function () {
                    function compareMonths(a, b) {
                        if (a.month < b.month) {
                            return -1;
                        }
                        if (a.month > b.month) {
                            return 1;
                        }
                        return 0;
                    }
                    var transactions, monthlyInfoMap, monthlyTransactionInfo, monthYear;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                    select: {
                                        date: true,
                                    },
                                    where: {
                                        date: {
                                            gte: new Date(startMonth),
                                            lte: new Date((0, analytics_helpers_1.incrementDateByOneMonth)(endMonth)),
                                        },
                                    },
                                })];
                            case 1:
                                transactions = _a.sent();
                                monthlyInfoMap = {};
                                transactions.forEach(function (transaction) {
                                    if (transaction.date) {
                                        var monthYear = transaction.date.toISOString().slice(0, 7); // Extract YYYY-MM from the date
                                        if (monthlyInfoMap[monthYear]) {
                                            monthlyInfoMap[monthYear]++;
                                        }
                                        else {
                                            monthlyInfoMap[monthYear] = 1;
                                        }
                                    }
                                });
                                monthlyTransactionInfo = [];
                                for (monthYear in monthlyInfoMap) {
                                    monthlyTransactionInfo.push({
                                        month: monthYear,
                                        transactions: monthlyInfoMap[monthYear],
                                    });
                                }
                                monthlyTransactionInfo.sort(compareMonths);
                                return [2 /*return*/, (0, analytics_helpers_1.fillMissingMonths)(monthlyTransactionInfo, "monthlyTransactions", startMonth, endMonth)];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, getMonthlyTransactionInfo(startMonth, endMonth)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnalyticsService.prototype.averageTransaction = function (startMonth, endMonth) {
        return __awaiter(this, void 0, void 0, function () {
            function getMonthlyAverageTransactionCost(startMonth, endMonth) {
                return __awaiter(this, void 0, void 0, function () {
                    function compareMonths(a, b) {
                        if (a.month < b.month) {
                            return -1;
                        }
                        if (a.month > b.month) {
                            return 1;
                        }
                        return 0;
                    }
                    var monthlyData, transactions, monthlyAverageCost, monthYear, _a, totalCost, transactionCount, averageCost;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                monthlyData = {};
                                return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                        select: {
                                            date: true,
                                            products: {
                                                select: {
                                                    quantity: true,
                                                    product: {
                                                        select: {
                                                            price: true,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        where: {
                                            date: {
                                                gte: new Date(startMonth),
                                                lte: new Date((0, analytics_helpers_1.incrementDateByOneMonth)(endMonth)),
                                            },
                                        },
                                    })];
                            case 1:
                                transactions = _b.sent();
                                transactions.forEach(function (transaction) {
                                    if (transaction.date) {
                                        var monthYear = transaction.date.toISOString().slice(0, 7);
                                        if (!monthlyData[monthYear]) {
                                            monthlyData[monthYear] = { totalCost: 0, transactionCount: 0 };
                                        }
                                        var transactionCost = transaction.products.reduce(function (acc, product) {
                                            if (product.product && product.quantity) {
                                                return acc + product.product.price * product.quantity;
                                            }
                                            return acc;
                                        }, 0);
                                        monthlyData[monthYear].totalCost += transactionCost;
                                        monthlyData[monthYear].transactionCount += 1;
                                    }
                                });
                                monthlyAverageCost = [];
                                for (monthYear in monthlyData) {
                                    _a = monthlyData[monthYear], totalCost = _a.totalCost, transactionCount = _a.transactionCount;
                                    averageCost = transactionCount === 0 ? 0 : totalCost / transactionCount;
                                    monthlyAverageCost.push({
                                        month: monthYear,
                                        averageCost: averageCost,
                                    });
                                }
                                monthlyAverageCost.sort(compareMonths);
                                return [2 /*return*/, (0, analytics_helpers_1.fillMissingMonths)(monthlyAverageCost, "averageTransaction", startMonth, endMonth)];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, getMonthlyAverageTransactionCost(startMonth, endMonth)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnalyticsService.prototype.monthlyTransactionSum = function (startMonth, endMonth) {
        return __awaiter(this, void 0, void 0, function () {
            function getMonthlyTransactionCosts(startMonth, endMonth) {
                return __awaiter(this, void 0, void 0, function () {
                    function compareMonths(a, b) {
                        if (a.month < b.month) {
                            return -1;
                        }
                        if (a.month > b.month) {
                            return 1;
                        }
                        return 0;
                    }
                    var transactions, monthlyData, monthlyTransactionCosts, monthYear;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                    select: {
                                        date: true,
                                        products: {
                                            select: {
                                                quantity: true,
                                                product: {
                                                    select: {
                                                        price: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    where: {
                                        date: {
                                            gte: new Date(startMonth),
                                            lte: new Date((0, analytics_helpers_1.incrementDateByOneMonth)(endMonth)),
                                        },
                                    },
                                })];
                            case 1:
                                transactions = _a.sent();
                                monthlyData = {};
                                transactions.forEach(function (transaction) {
                                    if (transaction.date) {
                                        var monthYear = transaction.date.toISOString().slice(0, 7);
                                        var transactionCost = transaction.products.reduce(function (acc, product) {
                                            if (product.product && product.quantity) {
                                                return acc + product.product.price * product.quantity;
                                            }
                                            return acc;
                                        }, 0);
                                        if (!monthlyData[monthYear]) {
                                            monthlyData[monthYear] = transactionCost;
                                        }
                                        else {
                                            monthlyData[monthYear] += transactionCost;
                                        }
                                    }
                                });
                                monthlyTransactionCosts = [];
                                for (monthYear in monthlyData) {
                                    monthlyTransactionCosts.push({
                                        month: monthYear,
                                        transactionCostsSum: monthlyData[monthYear],
                                    });
                                }
                                // Sort the array by month
                                monthlyTransactionCosts.sort(compareMonths);
                                return [2 /*return*/, (0, analytics_helpers_1.fillMissingMonths)(monthlyTransactionCosts, "monthlyTransactionSum", startMonth, endMonth)];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                return [2 /*return*/, getMonthlyTransactionCosts(startMonth, endMonth)];
            });
        });
    };
    AnalyticsService.prototype.monthlyProductSales = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            function getMonthlyProductSales(productId) {
                return __awaiter(this, void 0, void 0, function () {
                    function compareMonths(a, b) {
                        if (a.month < b.month) {
                            return -1;
                        }
                        if (a.month > b.month) {
                            return 1;
                        }
                        return 0;
                    }
                    var currentDate, currentYear, startMonth, endMonth, transactions, monthlyData, monthlyProductSales, monthYear;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                currentDate = new Date();
                                currentYear = currentDate.getFullYear().toString();
                                startMonth = currentYear + '-01-01';
                                endMonth = currentYear + '-12-31';
                                return [4 /*yield*/, prisma_client_1.default.transaction.findMany({
                                        select: {
                                            date: true,
                                            products: {
                                                select: {
                                                    productId: true,
                                                    quantity: true,
                                                },
                                            },
                                        },
                                        where: {
                                            date: {
                                                gte: new Date(startMonth),
                                                lte: new Date((0, analytics_helpers_1.incrementDateByOneMonth)(endMonth))
                                            }
                                        }
                                    })];
                            case 1:
                                transactions = _a.sent();
                                monthlyData = {};
                                transactions.forEach(function (transaction) {
                                    if (transaction.date) {
                                        var monthYear = transaction.date.toISOString().slice(0, 7);
                                        var productSale = transaction.products.reduce(function (acc, product) {
                                            if (product.productId === productId && product.quantity) {
                                                return acc + product.quantity;
                                            }
                                            return acc;
                                        }, 0);
                                        if (!monthlyData[monthYear]) {
                                            monthlyData[monthYear] = productSale;
                                        }
                                        else {
                                            monthlyData[monthYear] += productSale;
                                        }
                                    }
                                });
                                monthlyProductSales = [];
                                for (monthYear in monthlyData) {
                                    monthlyProductSales.push({
                                        month: monthYear,
                                        productSales: monthlyData[monthYear],
                                    });
                                }
                                monthlyProductSales.sort(compareMonths);
                                return [2 /*return*/, (0, analytics_helpers_1.fillMissingMonths)(monthlyProductSales, "monthlyProductSales", startMonth.slice(0, -3), endMonth.slice(0, -3))];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, getMonthlyProductSales(productId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AnalyticsService;
}());
