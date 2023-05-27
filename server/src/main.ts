import { run } from "./lib/Server";
import { Express } from "express";





async function main() {
    const server: Express = await run();
    return !!server;
}



main()
/* .then((res) => {
    console.log("[SERVER][main.main] MODULE EXECUTED RESULT: ", res);
})
.catch((err) => {
    console.error("[SERVER][main.main] ERROR: ", err);
}) */



