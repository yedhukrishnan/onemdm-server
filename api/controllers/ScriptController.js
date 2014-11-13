/**
 * ScriptController
 *
 * @description :: Server-side logic for managing scripts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var extend = require('util')._extend;

module.exports = {
  
  create: function(req, res) {
    Script.create(req.body)
      .exec(function(error, script) {
        console.log("Created script:");
        console.log(script);
        req.flash('message', 'Script execution initiated');
        res.redirect("/script");
      });
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
          res.view('script/index', data);           

        });
      });
  },

  show: function(req, res) {
    Script.findOne(req.query.id)
      .populate('device')
      .then(function(script) {
        res.view('script/show', {script: script});
      });
  },

  executable: function(req, res) {
    Script.findOne({
      device: req.query.device,
      status: 'Pending'
    }).then(function(script) {
      if(script) {
        script.status = 'Delivered';
        script.save();
      }
      return res.json({ script: script });
    });
  },

  update: function(req, res) {
    
    if(req.isSocket) {
      console.log("### socket connected");
      Script.find().then(function(allScripts) {
        Script.subscribe(req.socket, allScripts);
      });
      return res.json({});
    }
    
    Script.update({id: req.params.id}, req.body)
      .exec(function(err, scripts) {
        if(err) {
          return res.json(err);
        }
        
        Script.publishUpdate(scripts[0].id + '', { status: scripts[0].status });
        
        return res.json({
          script: scripts[0]
        });
      });
  }

};

