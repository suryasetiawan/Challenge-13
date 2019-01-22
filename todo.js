const readline = require('readline');
const fs = require('fs');

let data = JSON.parse(fs.readFileSync("todo.json", 'utf8'));
let input = process.argv;

switch (process.argv[2]) {
    case undefined:
        console.log(
            ">>> JS TODO <<<" +
            "\n $ node todo.js <command>" +
            "\n $ node todo.js list" +
            "\n $ node todo.js task <task_id>" +
            "\n $ node todo.js add <task_content>" +
            "\n $ node todo.js delete <task_id>" +
            "\n $ node todo.js complete <task_id>" +
            "\n $ node todo.js uncomplete <task_id>" +
            "\n $ node todo.js list: outstanding asc|desc" +
            "\n $ node todo.js list: completed ascldesc" +
            "\n $ node todo.js tag <task_id><tag_name_1><tag_nam e_2>...<tag_name_N>" +
            "\n $ node todo.js filter:<tag_name>"
        );
        process.exit(0);

    case 'add':
        let output = '';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ' ';

        }
        data.push({
            "task_content": output,
            "status": false,
            "tag": []
        })
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
        console.log(`" ${output}" telah ditambahkan`);
        process.exit(0);

    case 'list':
        console.log("--------------------")
        console.log("| Daftar Pekerjaan |");
        console.log("--------------------")
        for (let j = 0; j < data.length; j++) {
            console.log(`${j + 1}.${data[j].status ? '[x]' : '[ ]'} ${data[j].task_content}`);
        }
        process.exit(0);

    case 'delete':
        let index = parseInt(input[3] - 1);
        let number = data[index];
        data.splice(index, 1);
        console.log(`" ${number.task_content}" telah dihapus dari daftar `);
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
        process.exit(0);

    case 'complete':
        let indexComplete = parseInt(input[3] - 1);
        data[indexComplete].status = true;
        console.log(`" ${data[indexComplete].task_content}" telah selesai`);
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
        process.exit(0);

    case 'uncomplete':
        let indexUncomplete = parseInt(input[3] - 1);
        data[indexUncomplete].status = false;
        console.log(`" ${data[indexUncomplete].task_content}" status selesai dibatalkan" `);
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
        process.exit(0);

    case 'help':
        console.log(
            ">>> JS TODO <<<" +
            "\n $ node todo.js <command>" +
            "\n $ node todo.js list" +
            "\n $ node todo.js task <task_id>" +
            "\n $ node todo.js add <task_content>" +
            "\n $ node todo.js delete <task_id>" +
            "\n $ node todo.js complete <task_id>" +
            "\n $ node todo.js uncomplete <task_id>" +
            "\n $ node todo.js list: outstanding asc|desc" +
            "\n $ node todo.js list: completed asc|desc" +
            "\n $ node todo.js tag <task_id><tag_name_1><tag_nam e_2>...<tag_name_N>" +
            "\n $ node todo.js filter:<tag_name>"
        );
        process.exit(0);

    case 'list:outstanding':
        if (input[3] == "asc") {
            for (let k = 0; k < data.length; k++) {
                if (!data[k].status) {
                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                }
            }
        }
        if (input[3] == "desc") {
            for (let k = data.length - 1; k >= 0; k--) {
                if (!data[k].status) {
                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                }
            }
        }
        process.exit(0);

    case 'list:completed':
        if (input[3] == "asc") {
            for (let k = 0; k < data.length; k++) {
                if (data[k].status) {
                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                }
            }
        }
        if (input[3] == "desc") {
            for (let k = data.length - 1; k >= 0; k--) {
                if (data[k].status) {

                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                }
            }
        }
        process.exit(0);

    case 'tag':
        let indexTag = parseInt(input[3]) - 1;
        for (let i = 4; i < input.length; i++) {
            if (!data[indexTag].tag.includes(input[i])) {
                data[indexTag].tag.push(input[i])
            }
        }
        console.log(data[indexTag].tag + ' ' + "telah ditambahkan ke daftar" + ' ' + data[indexTag].task_content);
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
        process.exit(0);

};
word(process.argv[2])
function word() {
    let a = process.argv[2]
    let b = a.slice(0, 7)
    if (b == 'filter:') {
        data.map((number, index) => {
            if (number.tag.includes(a.slice(7))) {
                console.log(`${index + 1}.${number.status ? '[x]' : '[ ]'} ${number.task_content}`);
            }
        })
    };

};