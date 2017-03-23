"use strict";
var http_1 = require("@angular/http");
var GlobalTicket = (function () {
    function GlobalTicket(accountService) {
        this.accountService = accountService;
    }
    Object.defineProperty(GlobalTicket, "Headers", {
        get: function () {
            this.headers = new http_1.Headers({
                "Content-Type": "application/json",
                "75e27c69-1186-4316-b322-9303265c9597": "c6e3a0ff-c1aa-4e52-bcfa-334f741d223e"
            });
            return this.headers;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalTicket;
}());
exports.GlobalTicket = GlobalTicket;
//# sourceMappingURL=Ticket.js.map