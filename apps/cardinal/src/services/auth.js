"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService = function (atom, vm, { dispatch, call }) {
    let self = this;
    let i = atom._.big(0);
    return {
        name: "auth",
        methods: {
            controle: [this.pre.auth, (a, p) => {
                    console.log("prevs:", p);
                    return "hellowww: " + p.join(",");
                }],
        },
        hooks: {
            stop() {
                console.log("stopped");
            },
            start: () => {
                console.log("started");
            }
        }
    };
};
exports.default = UserService;
//# sourceMappingURL=auth.js.map