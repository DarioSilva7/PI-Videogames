//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre, Platform} = require('./src/db.js');
const axios = require('axios');
const {API_KEY} = process.env

// Syncing all the models at once
conn.sync({ force: false}).then(() => {
  axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then(rta=>{
    return rta.data.results.forEach(el=> Genre.findOrCreate({
      where:{
        id:el.id,
        name: el.name}}
    ))
  })
    
  //   axios.get(`https://api.rawg.io/api/platforms/parents?key=${API_KEY}`).then(rta=>{
  //   return rta.data.results.forEach(e=> Platform.findOrCreate({
  //     where:{
  //       id: e.id,
  //       name: e.name
  //     }
  //     }))
  // }); 
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  })
}); 