var pmx = require('..');
var should = require('should');
var pkg = require('../package.json');

function forkWithoutEnv() {
  var app = require('child_process').fork(__dirname + '/fixtures/module/module.fixture.js', [], {
    env : {
    }
  });
  return app;
}

function forkWithSpecificVar() {
  var app = require('child_process').fork(__dirname + '/fixtures/module/module.fixture.js', [], {
    env : {
      'module' : '{ "option1" : "value1", "option2" : "value2", "initial" : "over", "password" : "1234s" }'
    }
  });
  return app;
}

function forkWithSpecificVarSubFile() {
  var app = require('child_process').fork(__dirname + '/fixtures/module/subfile/echo.js', [], {
    env : {
      name : 'app-name',
      'app-name' : '{ "option1" : "value1", "option2" : "value2", "initial" : "over", "password" : "1234s" }'
    }
  });
  return app;
}

describe('PMX module', function() {
  var app;
  var action_name;

  describe('MODULE transfer the right messages when initializing app using PMX', function() {
    it('should get right configuration data', function(done) {
      // 1 - It should emit an action
      app = forkWithoutEnv();

      function processMsg(dt) {
        if (dt.type != 'axm:option:configuration') return;
        /**
         * Right event sent
         */
        dt.type.should.eql('axm:option:configuration');

        /**
         * Options set
         */
        dt.data.description.should.eql('comment');
        dt.data.module_version.should.eql('1.0.5');
        should(dt.data.pmx_version).eql(pkg.version);
        dt.data.module_name.should.eql('module');
        dt.data.alert_enabled.should.be.true;

        /**
         * Configuration succesfully passed
         */
        dt.data.initial.should.eql('init-val');

        /**
         * Should configuration variable be mirrored into module_conf
         * attribute (for keymetrics purposes)
         */
        dt.data.module_conf.initial.should.eql('init-val');
        app.kill();
        app.removeListener('message', processMsg);
        done();
      }

      app.on('message', processMsg);
    });

    it('should get the right data and options passed by PM2 via conf system ', function(done) {
      // 1 - It should emit an action
      app = forkWithSpecificVar();

      function processMsg(dt) {

        /**
         * Right event sent
         */
        dt.type.should.eql('axm:option:configuration');

        /**
         * Configuration succesfully passed
         */
        dt.data.option1.should.eql('value1');
        dt.data.option2.should.eql('value2');
        dt.data.initial.should.eql('over');
        should(dt.data.pmx_version).eql(pkg.version);

        /**
         * Should configuration variable be mirrored into module_conf
         * attribute (for keymetrics purposes)
         */
        dt.data.module_conf.option1.should.eql('value1');
        dt.data.module_conf.option2.should.eql('value2');
        dt.data.module_conf.initial.should.eql('over');
        app.kill();
        app.removeListener('message', processMsg);
        done();
      }

      app.on('message', processMsg);
    });

    it('should get the right data of a package.json in sub folder', function(done) {
      // 1 - It should emit an action
      app = forkWithSpecificVarSubFile();

      function processMsg(dt) {
        /**
         * Right event sent
         */
        dt.type.should.eql('axm:option:configuration');

        /**
         * Configuration succesfully passed
         */

        dt.data.option1.should.eql('value1');
        dt.data.option2.should.eql('value2');
        dt.data.initial.should.eql('over');
        should(dt.data.pmx_version).eql(pkg.version);

        /**
         * Should configuration variable be mirrored into module_conf
         * attribute (for keymetrics purposes)
         */
        dt.data.module_conf.option1.should.eql('value1');
        dt.data.module_conf.option2.should.eql('value2');
        dt.data.module_conf.initial.should.eql('over');
        app.kill();
        app.removeListener('message', processMsg);
        done();
      }

      app.on('message', processMsg);
    });

  });

  describe('Test security and utility features', function() {
    it('should hide password', function(done) {
      app = forkWithSpecificVar();

      function processMsg(dt) {
        dt.data.alert_enabled.should.be.true;
        dt.data.password.should.eql('1234s');
        dt.data.module_conf.password.should.eql('Password hidden');
        done();
        app.removeListener('message', processMsg);
        app.kill();
      }

      app.on('message', processMsg);
    });
  });



});
