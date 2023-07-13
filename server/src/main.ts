import { run } from "./lib/Server";
import { Express } from "express";





async function main() {
    const server: Express = await run();
    return !!server;
}



main()




