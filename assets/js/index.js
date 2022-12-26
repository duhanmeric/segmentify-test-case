import Tabs from "./Tabs/index.js";

async function main() {
  const jsonFile = await (await fetch("../../katalog.json")).json();

  new Tabs(jsonFile);
}

main();
