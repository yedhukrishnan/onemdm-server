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
        if(error) {
          return res.json({});
        }
        return res.json({
          device: script.device
        });
      });
  },

  index: function(req, res) {
    Script.find()
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

  executable: function(req, res) {
    console.log(req.query);
    Script.findOne({
      device: req.query.device,
      status: 'pending'
    }).then(function(script) {
      if(script) {
        script.status = 'delivered';
        script.save();
      }
      return res.json({ script: script });
    });
  }

};

