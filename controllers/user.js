const debug = require('debug')('app:controller:user');
const user = require('../models/user.js');

class UserController {
  async showAllUser (req, res) {
    let users = (await user.get()).rows;

    res.render('index', {
      users
    });
  }

  async detail (req, res, next) {
    res.locals.edit = true;

    let id = req.params.id;

    debug('detail %o', id)

    try {
      let detail = (await user.get(id)).rows[0];

      res.render('index', {
        user: detail
      });
      
    } catch (e) {
      next(e.detail || e);
    }
  }

  async edit (req, res, next) {

    let data = req.body;

    try {
      let result = await user.edit(data);
      res.end('ok!');
    } catch (e) {
      next(e.detail || e);
    }
  }

  async login (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    
    try {
      let result = await user.login(username, password);
      req.session.isLogin = true;
      res.end('Welcome!');
      // res.redirect('/');
      // res.end('Welcome!');
    } catch (e) {
      next(e.detail || e);
    }
  } 

  async delete (req, res, next) {
    let id = req.body.id;

    try {
      let result = (await user.delete({id}));
      res.redirect('/');
    } catch (e) {
      next(e.detail);
    }
  }

  async register (req, res, next) {
    let data = req.body;

    try {
      let result = await user.register(data);
      res.send('Hi! New User~')
    } catch (e) {
      next(e.detail);
    }
  }
}

module.exports = new UserController();