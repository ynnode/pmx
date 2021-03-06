
# 1.2.1

- Deep refactor (avoid NS collision + centralize Wrapping)
- Monitor getActiveRequests() + getActiveHandles() by default
- Harden ports discovery
- Harden bandwith monitoring
- Drop Proxy wrapping and switch to shimmer
- Drop deprecated slow route broadcasting
- Drop callsites in pmx
- Add error level (fatal for exception/unhandled rejection - error for .notify())
- Rename Loop Delay by Event Loop Latency
- New method on pmx.init({ new_port : 20000 }) // it replaces the base port with the new one and broadcast to pm2 the base port ('lb:listening:port') // lib/wrapper/net_wrapper.js

# 1.2.0

- allow to pmx.emit without data

# 1.1.0

- new tracing system

# 1.0.3

- alias samples to seconds
- Http probe req/s -> req/min

# 1.0.2

- add stackframe to exception

# 1.0.1

- Include transaction tracing system
- Test on Node v7

# 0.6.8

- Final unhandledRejection warning message

# 0.6.3

- Add defaut custom action getEnv (display process environment variables)

# 0.6.2

- [#68] Add unref to all background jobs to free the event loop
- [#67] Stop clearing main module's path
- New smart probe algorithm
- Smart probes fixed (no null value anymore)

# 0.5.6

- [#58] Clear all intervals when receiving kill signal from PM2 to free event loop
- [#37] Don't mess with incoming error
- right pmx version injected into module
- if pmx cannot find package.json in current folder, try to require in parent folder
- disable some error messages

# 0.5.4

- axm_options now has PMX version (but only the value in the package.json)

# 0.5.3

- Fix alert system
- Change <>

# 0.5.0

- Auto initialize Configuration
- Enable alerts by default

# 0.4.0

- Hide password once it's set
- Do not force app keep alive when calling configureModule (already done when using probes)
- alias action attribute to func in alert system + pass value
- Attach auto alerts to all probes
- append alert configuration to probes (subfield alert, attaching value threshold and interval (for threshold-avg)
- Add autocast object system for configuration (WARNING!!! STRING WITH ONLY NUMBER WILL BE CAST TO INT)
- BUG FIX: pmx.notify JSON | STRING create separated alerts (before it was not working because the stack trace was the same, coming from `new Error in notify.js`

Notes:
- [X] for app, configuration is loaded depending on the application name declared in package.json
- [ ] configuration must be injected into raw Node.js applications
- [ ] uncomment Configuration.init(opts) in index.js for PMX.init

# 0.3.30

- add alert_enabled field for .init() / .initModule()

# 0.3.29

- Mode thresold-avg via binary heap
- Alert system for counter
- Better algorithm

# 0.3.28

- Allow not passing any value to Metric probe

# 0.3.27

- Declare var for Alert

# 0.3.26

- Fix uncaught exception fork (allow override)

# 0.3.25

- pmx.getConf() to get module configuration
- add smart probes
- fix null null null when passing length in error message
- add field axm_monitor.module_conf (km hot display)
- Scoped actions

# 0.2.27

- Remove debug message
- Rename module
- Auto instanciation

# 0.2.25

- Add ip address on each transaction

# 0.2.24

- Add unit option for Histogram and Meter

# 0.2.23

- Include Counter, Meter, Metric and Histogram
