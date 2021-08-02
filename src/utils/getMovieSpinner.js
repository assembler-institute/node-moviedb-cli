const ora = require('ora');

exports.spinnerStart = function(){  
    const spinner = ora('Loading Film').start();
}
exports.spinnerSucced = function(){
    spinner.succeed('Film loaded successfully');
}
exports.spinnerFail = function(){
    spinner.fail('Film not loaded');
}
exports.spinnerStop = function(){
    spinner.stop();
}
