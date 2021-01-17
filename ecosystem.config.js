module.exports = {
    apps: [{
        name: "mern-test",
        script: "npm -- start",
        error_file: 'err.log',
        out_file: 'out.log',
        log_file: 'combined.log',
        time: true,
        watch: ["config", "middleware", "models", "routes", "app.js"],
        ignore_watch: ["node_modules", "client"],
        watch_delay: 1000
    }]
}
