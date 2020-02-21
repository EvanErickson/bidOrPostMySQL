const prompt = require('inquirer').createPromptModule()
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'auction_db'
})

prompt([
    {
        type: 'list',
        name: 'bidOrPost',
        message: 'Do you want to post or bid?',
        choices: [
            'Post',
            'Bid'
        ]
    }
]) .then(response => {
    if (response.bidOrPost === 'Post') {
        prompt([
            {
                type: 'input',
                name: 'postItemName',
                message: 'What do you want to sell?',
            }
        ]) .then((response) => {
            connection.query('INSERT INTO auction_post SET ?', {
                item: response.postItemName
              }, (err) => {
                if (err) { console.log(err) }
                console.log('Success!')
              })
        })
        .catch (e => console.log(e))
    }
})
.catch (e => console.log(e))

