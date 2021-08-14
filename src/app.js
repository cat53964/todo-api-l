const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const models = require("../models")

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser 在2019年已经废弃
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 创建一个todo
app.post("/create", async (req, res, next) => {
  let { name, deadline, content } = req.body;
  try {
    // 数据持久化到数据库
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    })
    res.json({
      todo,
      message: "任务创建成功"
    })
  } catch (error) {
    next(error);
  }

})
// 编辑一个todo
app.post("/update", async (req, res, next) => {
  try {
  let { name, deadline, content, id } = req.body;
      // 数据持久化到数据库
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
  if (todo) {
    todo = await todo.update({
      name,
      deadline,
      content
    })
  }
    res.json({
      todo
    })
  } catch (error) {
    next(error)
  }
})
// 修改一个todo,删除
app.post("/update_status", async (req, res, next) => {
    try {
  let { id, status } = req.body;
      // 数据持久化到数据库
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
  if (todo && status != todo.status) {
    todo = await todo.update({
      status
    })
  }
    res.json({
      todo
    })
  } catch (error) {
    next(error)
  }
})

// 查询任务列表
app.get("/list/:status/:page", async (req, res, next) => {
  let { status, page } = req.params;
  let limit = 10;
  let offset = (page - 1) * limit;
  let where = {};
  if (status != -1) {
    where = {
      status
    };
  }
  // 1 状态 1 表示代办 2 完成 3 删除 -1 全部
  // 2 分页处理
  let list = await models.Todo.findAndCountAll({
    where,
    offset,
    limit
  });
  res.json({
    list,
    message: "分页查询成功"
  })
})

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message:err.message
    })
  }
})

app.listen("2000", function () {
  console.log("脚本成功")
})