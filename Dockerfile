# ใช้ Node.js 22 เป็น base image
FROM node:22

# กำหนด working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้าไปใน container
COPY . .

# Build โปรเจกต์ Next.js
RUN npm run build

# เปิดพอร์ตที่ Next.js ใช้งาน
EXPOSE 8888

# รันเซิร์ฟเวอร์ของ Next.js (production mode)
CMD ["npm", "start"]
