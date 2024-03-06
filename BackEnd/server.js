import app from "./app.js";
import Config from "./config.js";

main();

function main() {
    app.listen(Config.PORT, () => {
        console.log("Server is listening on port", Config.PORT);
    })
}