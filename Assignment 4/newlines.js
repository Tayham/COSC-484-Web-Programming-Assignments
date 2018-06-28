var fs = require('fs');
var buffer = fs.readFileSync(process.argv[2]);
var output = buffer.toString();
var numberOfLines = output.split(/\r\n|\r|\n/).length;
process.stdout.write("There are " + numberOfLines + " new lines in the " + process.argv[2] + " file");