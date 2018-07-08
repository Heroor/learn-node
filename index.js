const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
// const config = require('./config/default.js')
const routes = require('./routes')
const pkg = require('./package')

const app = express()

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎
app.set('view engine', 'ejs')

// 设置静态目录
app.use(express.static(path.join(__dirname, 'pablic')))

// session 中间件
app.use(session({
  name: config.session.key, //设置 cookie 中保存session id的字段名
  secret: config.session.secret, // 设置secret类计算hash值并放在cookie， 放置篡改
  resave: true, // 强制更新
  saveUninitialized: false, // 设置false 强制创建一个session 即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间 过期后cookie中的session id走动删除
  },
  store: new MongoStore({
    url: config.mongodb // mongod地址
  })
}))

// flash 中间件
app.use(flash())

// 路由
routes(app)

app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}...`)
})