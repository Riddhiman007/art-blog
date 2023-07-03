"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 17841:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/email"
const email_namespaceObject = require("next-auth/providers/email");
var email_default = /*#__PURE__*/__webpack_require__.n(email_namespaceObject);
;// CONCATENATED MODULE: external "@next-auth/prisma-adapter"
const prisma_adapter_namespaceObject = require("@next-auth/prisma-adapter");
;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./lib/prisma.ts

let prisma;
const globalWithPrisma = global;
if (false) {} else {
    prisma = new client_namespaceObject.PrismaClient();
}
// @ts-ignore
/* harmony default export */ const lib_prisma = (prisma);

;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].ts


// import clientPromise from "../../../../lib/mongoose";


// options for authorization
const authOptions = {
    // debug: process.env.NODE_ENV === "development",
    adapter: (0,prisma_adapter_namespaceObject.PrismaAdapter)(lib_prisma),
    pages: {
        signIn: "/auth/login",
        verifyRequest: "/auth/verify"
    },
    providers: [
        // Email otp provider
        email_default()({
            maxAge: 300,
            server: process.env.EMAIL_SERVER,
            from: "rudrasir123@outlook.com",
            generateVerificationToken () {
                const token = Math.floor(Math.random() * (1000000 - 100000) + 100000);
                return String(token);
            }
        })
    ],
    session: {
        strategy: "database"
    },
    callbacks: {
        async session ({ session , user  }) {
            session.user = user;
            return session;
        }
    }
};
// export default authOptions;
// const handler = NextAuth(authOptions);
/* harmony default export */ const _nextauth_ = (external_next_auth_default()(authOptions)); // export { handler as GET, handler as POST };
 // export function GET(req: NextApiRequest, res: NextApiResponse) {
 //   NextAuth(req, res, authOptions);
 // }
 // export function POST(req: NextApiRequest, res: NextApiResponse) {
 //   NextAuth(req, res, authOptions);
 // }


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(17841));
module.exports = __webpack_exports__;

})();