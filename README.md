# Nuxt + Koa全栈开发美团网

## 部署
使用Nuxt官方提供的服务端部署方式，并解决跨域问题。使用pm2守护进程。

### 1. install node.js
```
$ cd /root
$ wget https://nodejs.org/dist/latest/node-v14.2.0-linux-x64.tar.xz
$ ln -s /root/node-v14.2.0-linux-x64/bin/node /usr/local/bin/node
$ ln -s /root/node-v14.2.0-linux-x64/bin/npm /usr/local/bin/npm
$ npm config set registry https://registry.npm.taobao.org
```
### 2. install pm2
```
$ npm install pm2 -g
$ ln -s /root/node-v14.2.0-linux-x64/bin/pm2 /usr/local/bin/pm2
```
### 3. install mongodb
```
$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.2.6.tgz
$ tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.2.6.tgz
$ ln -s /root/mongodb-linux-x86_64-ubuntu1604-4.2.6/bin/mongod /usr/local/bin/npm

```
### 4. install redis
```
$ wget http://download.redis.io/releases/redis-6.0.1.tar.gz
$ tar xzf redis-6.0.1.tar.gz
$ cd redis-6.0.1
$ make
$ ln -s /root/redis-6.0.1/src/redis-server /usr/local/bin/redis-server

```
### 5. pull project and run
```
git clone https://github.com/zsqzsq1993/Nuxt-Meituan.git
npm run build
pm2 start mongod
pm2 start redis-server
pm2 start npm --name "meituanApp" -- run start
```
ENJOY

EOF
