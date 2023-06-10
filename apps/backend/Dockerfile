# 使用官方Node.js镜像作为基础镜像
FROM node:18.16.0

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 文件到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install -g pnpm@7.17.0
Run pnpm install --prod

# 复制项目文件到工作目录
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用

CMD ["npm", "run", "start:prod"]