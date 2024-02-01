import React, { useEffect, useState } from "react";

export default function FetchData() {
  // Gọi API lấy thông tin tất cả tài khoản
  const loadData = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json()) // Chuyển đổi từ kiểu JSON sang JS
      .then((user) => console.log(user)) // Lấy giá trị trả về từ API
      .catch((error) => console.log("Đã có lỗi xảy ra: ", error)); // Bắt lỗi khi API có vấn đề
  };

  useEffect(() => {
    loadData();
  }, []);

  const [user, setUser] = useState({
    user_name: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    email: "",
    password: "",
  });

  // Lắng nghe sự kiện onChange, lấy giá trị từ các input
  const handleChange = (e) => {
    // Lấy ra value và name của từng ô input
    const { value, name } = e.target;

    // Tiến hành cập nhật state cho từng trường
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Gửi dữ liệu lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("Đã co lỗi xảy ra: ", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="user_name"
          onChange={handleChange}
          type="text"
          placeholder="Nhập tên"
        />
        <input
          name="gender"
          onChange={handleChange}
          type="number"
          min={0}
          max={2}
        />
        <input type="date" onChange={handleChange} name="dateOfBirth" />
        <input
          type="text"
          placeholder="Địa chỉ"
          name="address"
          onChange={handleChange}
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Mật khẩu"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
