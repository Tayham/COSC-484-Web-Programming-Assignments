var fs = require('fs');
var sum = 0;
var numberOfNumbers = process.argv.length - 2;
for(var i=0; i<numberOfNumbers; i++){
    sum = sum + Number(process.argv[i+2]);
}
process.stdout.write(sum.toString());