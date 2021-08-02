const chalk = require('chalk');

exports.movie_render = function(obj){
    
    if(obj.title != undefined){
    console.log(chalk.white('---------------------'+ obj.title+ '------------------\n'))
    console.log(chalk.blue('Movie ID: ' + obj.id + '\n'));
    console.log(chalk.bold.blue('Movie TITLE: ' + obj.title + '\n'));
    console.log(chalk.white('RELEASE DATE: ' + obj.release_date + '\n'));
    console.log(chalk.white('RUNTIME: ' + obj.runtime + '\n'));
    console.log(chalk.white('VOTE COUNT: ' + obj.vote_count + '\n'));
    console.log(chalk.white('OVERVIEW: ' + obj.overview + '\n'));
    console.log(chalk.white('\n'));
    if(obj.genre != ''){
        console.log(chalk.white('GENRE: ' + obj.genres[0].name + '\n'));
    }else{
        console.log(chalk.yellow('The movie doesn’t have a declared genre \n'))
    }
    console.log(chalk.white('\n'));

    if(obj.spoken_lenguages != ''){
        const len = obj.spoken_languages;
        len.forEach((name) => {
        console.log(chalk.white('LENGUAGES: ' + name.name + '\n'));
        });
    }else{
        console.log(chalk.yellow(`The movie: ${obj.id} doesn’t have any declared languages \n` ))
    }
    
    }else{
        const res = obj.results;
        if(res.length > 0){
            let totalPages = obj.total_pages;
            let pages = obj.page;
            if(totalPages > pages){
                console.log(chalk.white('--------------------------\n'));
                console.log(chalk.white('PAGE : '+ pages + ' OF '+ totalPages + '\n'));
                console.log(chalk.white('--------------------------\n'));
            }
            console.log('\n');
            res.forEach((resu) => {
            console.log(chalk.bold.blue('AUTHOR: ' + resu.author));
            let cont = resu.content;
            if(cont.length > 400){
                cont.slice(0, 399);
                console.log(chalk.white('CONTENT: ' +cont+'...'));
            }else{
                console.log(chalk.white(resu.content+'\n'));
            }

            });


        }else{
            console.log(chalk.yellow(`The movie: ${obj.id} doesn’t have any reviews`))
        }
    }

    
}
