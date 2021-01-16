module.exports = {
    apps: [{
        name: "mern-test",
        script: "npm -- start",
        watch: ["config", "middleware", "models", "routes", "app.js"],
        ignore_watch: ["node_modules", "client"],
        watch_delay: 1000
    }]
}
