#!/usr/bin/env node
    /**
     * Module dependencies.
     */
    function isDefined(x) { return x !== null && x !== undefined; } 
    Array.prototype.contain = function(obj) {
      return this.indexOf(obj) !== -1;
    }

    var program = require('commander');
    var version = require("../package.json").version;

    program
      .version(version)
        .usage(" badge -n badge-cli -f [md] -t [npm] ")
        .option('-n, --name [name]', 'npm name,for example: q')
      .option('-f, --format [format]', '可选值：url, markdown（默认值）, html, textile, rdoc, asciidoc, rst')
      .option('-t, --type [type]', '可选值：npm（默认值）, ruby    , python    , bower    , github    , nuget    , php    , cocoapods    , perl  ')
        .option('-v, --verbose', '打印详细日志')
      .parse(process.argv);

    var module_name = '';
    if(isDefined(program.name) == true && typeof program.name == 'string' ){
        module_name = program.name;
    }else{
        console.log('没有知道模块名称，请重新输入,比如\n\t badge -n badge-cli -f [md] -t [npm] ');
        return;
    }

    var format = "markdown";
    var type = "js";

    if (program.format) {
        format = program.format;
    }

    if (program.type) {
        type = program.type;
    }

    var verbose = false;
    if (program.verbose) {
        verbose = program.verbose;
    }

    var FORMATS = ['url', 'markdown', 'html', 'textile', 'rdoc', 'asciidoc', 'rst']

    if (FORMATS.contain(format) == false) {
        console.log('-f 可选值：url, markdown（默认值）, html, textile, rdoc, asciidoc, rst');
        return;
    }

    var _verbose = verbose;
    function log(str){
        if(_verbose == true){
            console.log(str);
        }
    }

    log('format = ' + format);
    log('type = ' + type);
    log('name = ' + module_name);
    log('verbose = ' + verbose);

    // main 
    require('../index')(module_name, type, format, verbose);