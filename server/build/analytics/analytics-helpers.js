"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillMissingMonths = exports.incrementDateByOneMonth = void 0;
function incrementDateByOneMonth(dateString) {
    // Split the date string into year and month parts
    var _a = __read(dateString.split('-').map(Number), 2), year = _a[0], month = _a[1];
    // Create a Date object with the provided year and month
    var currentDate = new Date(year, month - 1); // Subtract 1 from month since it's 0-based
    // Add one month to the current date
    currentDate.setMonth(currentDate.getMonth() + 1);
    // Extract the updated year and month
    var updatedYear = currentDate.getFullYear();
    var updatedMonth = currentDate.getMonth() + 1; // Add 1 back to month to match the format
    // Format the updated year and month as "YYYY-MM" and return it
    var updatedDateString = "".concat(updatedYear, "-").concat(updatedMonth.toString().padStart(2, '0'));
    return updatedDateString;
}
exports.incrementDateByOneMonth = incrementDateByOneMonth;
function fillMissingMonths(data, field, start, end) {
    var startDate = new Date(start + '-01');
    var endDate = new Date(incrementDateByOneMonth(end) + '-01');
    var result = [];
    var currentDate = startDate;
    var _loop_1 = function () {
        var currentYear = currentDate.getFullYear();
        var currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding
        var currentMonthStr = "".concat(currentYear, "-").concat(currentMonth); // "yyyy-mm" format
        var existingData = data.find(function (item) { return item.month === currentMonthStr; });
        if (existingData) {
            result.push(existingData);
        }
        else {
            if (field === "transactionCostsSum")
                result.push({ month: currentMonthStr, transactionCostsSum: 0 });
            if (field === "averageTransaction")
                result.push({ month: currentMonthStr, averageCost: 0 });
            if (field === "monthlyTransactionSum")
                result.push({ month: currentMonthStr, transactionCostsSum: 0 });
            if (field === "monthlyTransactions")
                result.push({ month: currentMonthStr, transactions: 0 });
            if (field === "monthlyProductSales")
                result.push({ month: currentMonthStr, productSales: 0 });
        }
        if (currentDate.getMonth() + 1 >= 12) {
            currentDate.setFullYear(currentYear + 1);
            currentDate.setMonth(0);
        }
        else
            currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    };
    while (currentDate <= endDate) {
        _loop_1();
    }
    return result;
}
exports.fillMissingMonths = fillMissingMonths;
