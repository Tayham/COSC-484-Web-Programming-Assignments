var fs = require('fs');
// var files = fs.readdir(process.argv[2]);
fs.readdir(process.argv[2], function (err, output) {
    // var output = buffer.toString();
    var filteredFiles = output.filter(checkFileExt);
    process.stdout.write(filteredFiles.toString());
});
// console.log(files);
function checkFileExt(file){
    return file.endsWith(process.argv[3]);
}