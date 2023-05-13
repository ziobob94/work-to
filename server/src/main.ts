import { ServerClass } from "./classes/ServerClass";





async function main() {
    
    const server = new ServerClass();
    
    return !!server;
}


main()
/* .then((res) => {
    console.log("[SERVER][main.main] MODULE EXECUTED RESULT: ", res);
})
.catch((err) => {
    console.error("[SERVER][main.main] ERROR: ", err);
}) */



