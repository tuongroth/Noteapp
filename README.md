# 📝 NoteApp

**NoteApp** là một ứng dụng quản lý ghi chú được xây dựng bằng **React** (frontend) và **Node.js/Express** (backend). Ứng dụng hỗ trợ **đăng ký, đăng nhập, CRUD (create, read, update, delete) ghi chú** và **lọc ghi chú theo cảm xúc**.

---

## 🔗 Link
**Frontend:** [https://notea-8f1x.onrender.com/](https://notea-8f1x.onrender.com/)  
**Backend:** [https://noteapp-1-1ehg.onrender.com/](https://noteapp-1-1ehg.onrender.com/)
---
## 👤 Tài khoản demo

Bạn có thể dùng tài khoản demo để đăng nhập và thử nghiệm app:  

- **Email:** cattuong@gmail.com  
- **Password:** 123
---
 ## Database Connection

Ứng dụng kết nối với MongoDB Atlas qua connection string:

mongodb+srv://note:Vi234567@cluster0.qfvpqsd.mongodb.net/note_app

Cluster đã được mở quyền truy cập từ mọi IP (`0.0.0.0/0`) để có thể demo trực tiếp mà không cần đăng nhập Mongo Atlas.

> ⚠️ Lưu ý: Connection này chỉ dùng cho mục đích học tập và demo, không khuyến khích dùng cho sản phẩm thật.

---
## 📸 Screenshot

![Note](https://raw.githubusercontent.com/tuongroth/screenshot/main/assets/566541503_25101902219462482_7572061466488307056_n.png) 
![Filter](https://raw.githubusercontent.com/tuongroth/screenshot/main/567530658_1011659234430768_4771482287346755668_n.png) 
![Extra](https://raw.githubusercontent.com/tuongroth/screenshot/main/assets/566537808_1164993755589124_8417382872247099959_n.png) 
![Register/Login Alt](https://raw.githubusercontent.com/tuongroth/screenshot/main/assets/566227599_1117414187259524_8882231231178432045_n%20(1).png)

---


## ⚙️ Tính năng

- **Đăng ký & Đăng nhập:** Tạo tài khoản mới và đăng nhập để sử dụng app.  
- **Hiển thị username:** Hiển thị tên người dùng hiện tại.  
- **Ghi chú:**  
  - Thêm ghi chú mới.  
  - Chỉnh sửa ghi chú (Edit).  
  - Xóa ghi chú (Delete).  
- **Filter:** Lọc ghi chú theo cảm xúc (emo).  

---

## 📝 Hướng dẫn sử dụng

### 1. Clone repo
```bash
git clone https://github.com/tuongroth/note-app.git
2. Cài đặt backend
cd server
npm install
npm start

3. Cài đặt frontend
cd frontend
npm install
npm run dev

💻 Công nghệ

Frontend: React JS + Vite, React Router, Context API

Backend: Node.js, Express

Database: MongoDB (hoặc mock API)

Thư viện khác: Axios, LocalStorage

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

