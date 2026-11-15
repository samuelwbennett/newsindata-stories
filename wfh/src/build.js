var fs=require('fs'),p=__dirname;
var s=fs.readFileSync(p+'/embed.src.js','utf8').replace('__DATA__',fs.readFileSync(p+'/data.json','utf8'));
fs.writeFileSync(p+'/../embed.js',s);console.log(s.length);
