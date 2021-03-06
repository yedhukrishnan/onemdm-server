/**
 * ScriptController
 *
 * @description :: Server-side logic for managing scripts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var extend = require('util')._extend;

module.exports = {
  
  create: function(req, res) {
    var scriptData = req.body;
    scriptData.rootPermission = scriptData.rootPermission == 'true';
    Script.create(scriptData)
      .exec(function(error, script) {
        req.flash('message', req.__("scripts")["execution-initiated"]);
        res.redirect("/script");
      });
  },

  new: function(req, res) {
    res.view('script/new', { device: req.query.device, page: req.query.page });
  },

  index: function(req, res) {
    Script.find()
      .populate('device')
      .sort('createdAt desc')
      .paginate({ page: req.query.page, limit: 10 })
      .then(function(scripts) {
        Script.count(function(error, deviceCount) {
          var pageCount = Math.ceil(deviceCount / 10);
          var currentPage = parseInt(req.query.page) || 1;
          var buttonClasses = ViewHelper.pagerButtonClasses(currentPage, pageCount);
          var data = extend({ 
            scripts: scripts, 
            currentPage: currentPage,
            layout: 'layout'
          }, buttonClasses);
          res.view(data);           

        });
      });
  },

  show: function(req, res) {
    Script.findOne(req.query.id)
      .populate('device')
      .then(function(script) {
        res.view({ script: script });
      });
  },

  executable: function(req, res) {
    Script.findOne({
      device: req.query.device,
      status: 'Pending'
    }).then(function(script) {
      if(script) {
        script.status = 'Delivered';
        script.save(function(error) {
          if(!error) {
            Script.publishUpdate(script.id + '', { status: script.status });
            return res.json({ script: script });
          }
        });
      }
    });
  },

  update: function(req, res) {
    
    if(req.isSocket) {
      Script.find().then(function(allScripts) {
        Script.subscribe(req.socket, allScripts);
      });
      return res.json({});
    }
    
    Script.update({ id: req.params.id }, req.body)
      .exec(function(err, scripts) {
        if(err) {
          res.status(422);
          return res.json(err);
        }
        Script.publishUpdate(scripts[0].id + '', { status: scripts[0].status, output: scripts[0].output });
        return res.json({
          script: scripts[0]
        });
      });
  }

};

