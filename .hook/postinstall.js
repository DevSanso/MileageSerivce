const {join,basename} = require('path');
const { fstat, mkdirSync, openSync, writeSync, lstat, existsSync, writeFileSync, readFileSync, readdirSync } = require('fs');

const root =process.cwd();


const createTestDbConfig = () => {
    const mkDirs = [join(root,"assets/test")];

    const testDbConfigTemplate = {
        "host" : "localhost",
        "port" : "3306",
        "user" : "root",
        "password":"",
        "dbName" : "test"
    };

    const mktestDbConfigJson = () => {
        const path = join(root,"assets/test/dbConfig.json");
        if(!existsSync(path)) 
            writeFileSync(path,JSON.stringify(testDbConfigTemplate));
    };

    mkDirs.forEach(value => {
        if(existsSync(value))return;
        mkdirSync(value)
    });
    console.log("assets/test 폴더 생성");
    mktestDbConfigJson();
    console.log("테스트 db config json 생성")
};

const moveSqlFiles = () => {
    const dir = join(root,"assets/sql");
    const dstDir = join(root,"bundle/sql");
    if(!existsSync(dstDir))mkdirSync(dstDir);
    
    const files = readdirSync(dir);
    console.log("sql 파일 복사");
    files.forEach(value => {
        const dstName = value;
        const dstPath = join(dstDir,dstName);
        const srcData = readFileSync(join(dir,value));
        console.log(`${dstName} 옮기기`);
        writeFileSync(dstPath,srcData);
    });
}


const createDbInitScript = () => {
    const dir = join(root,"bundle");
    if(!existsSync(dir))mkdirSync(dir);
    console.log("db 초기화 스크립트 읽기...");
    const src = join(root,"assets/script/dbInitScript");
    console.log("bundle 폴더에 복사, 붙여놓기...");
    const dst = join(root,"bundle/dbInit.js");
    const srcData = readFileSync(src);
    writeFileSync(dst,srcData);
}


createTestDbConfig();
moveSqlFiles();
createDbInitScript();