
module.exports = {
  apps: [{
    name: 'abis-beauty-corner',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: './',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}


