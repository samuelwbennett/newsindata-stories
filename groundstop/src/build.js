const fs=require("fs"),p=__dirname+"/";
fs.writeFileSync(p+"../embed.js",fs.readFileSync(p+"embed.src.js","utf8").replace("__MAP__",()=>fs.readFileSync(p+"map.json","utf8")));
