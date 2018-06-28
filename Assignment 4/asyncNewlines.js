var fs = require('fs');
fs.readFile(process.argv[2], function (err, buffer) {
    var output = buffer.toString();
    var numberOfLines = output.split(/\r\n|\r|\n/).length;
    process.stdout.write("There are " + numberOfLines + " new lines in the " + process.argv[2] + " file");
});
// console.log("Async Success");