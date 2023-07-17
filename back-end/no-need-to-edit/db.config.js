const database = require('knex')({
    client: 'mysql',
    connection: {
      host : "192.168.1.214",
      port : "3307",
      user : "internship_skb",
      password : "internship_skb",
      database : "internship_db_training"
    },
    useNullAsDefault: false,
    log: {
      warn(message) {
        console.log(message)
      },
      error(message) {
        console.log(message)
      },
      deprecate(message) {
        console.log(message)
      },
      debug(message) {
        console.log(message)
      }
    }
});

module.exports = database;