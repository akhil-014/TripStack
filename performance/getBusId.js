import https from "node:https";
import fs from "fs";

const url =
    "https://tripstack.doomple.com/api/buses?from=BOM&to=DEL";

https.get(url, (res) => {

    let data = "";

    res.on("data",
        chunk => data += chunk
    );

    res.on("end", () => {

        const json = JSON.parse(data);

        const busId =
            json.buses[0].id;

        fs.writeFileSync(
            "busid.txt",
            busId
        );

        console.log(
            `Bus Id: ${busId}`
        );
    });

});