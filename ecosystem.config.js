module.exports = {
    apps: [{
        name: "mern-test",
        script: "npm -- start",
        env: {
            NODE_ENV: "development"
        },
        env_production : {
            NODE_ENV: "production"
        },
        error_file: "err.log",
        out_file: "out.log",
        log_file: "combined.log",
        autorestart: true,
        watch: false,
        instance_var: "5000",
        append_env_to_name: true
        // watch: ["config", "middleware", "models", "routes", "app.js"],
        // ignore_watch: ["node_modules", "client"],
        // watch_delay: 1000
    }]
}
