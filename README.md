# Website chúc mừng sinh nhật

Website tĩnh gồm màn hình mật khẩu, album kỷ niệm, thư chúc mừng, hiệu ứng bánh sinh nhật và pháo giấy.

## Tùy chỉnh nhanh

Mở `script.js` và chỉnh phần `CONFIG` ở đầu tệp:

- `PASSWORD`: mật khẩu để mở trang (mặc định là `yeuem`).
- `LOVER_NAME`: tên hoặc biệt danh của người yêu.
- `PHOTOS`: đường dẫn, nhãn và lời chú thích từng ảnh.

Mở `index.html` và sửa nội dung lời chúc/lá thư theo ý bạn.

## Thêm ảnh và nhạc

1. Tạo thư mục `assets/photos` nếu chưa có.
2. Chép 6 ảnh vào đó và đặt tên `anh-1.jpg` đến `anh-6.jpg`, hoặc sửa đường dẫn trong `CONFIG.PHOTOS`.
3. Nếu muốn có nhạc, chép một tệp MP3 vào `assets/birthday-music.mp3`. Vì chính sách của trình duyệt, người xem cần bấm nút **Bật nhạc**.

Nếu ảnh chưa tồn tại, website tự hiện khung hướng dẫn thay ảnh nên bố cục không bị vỡ.

## Chạy thử

Bạn có thể mở trực tiếp `index.html`, hoặc chạy máy chủ cục bộ:

```powershell
python -m http.server 8000
```

Sau đó mở `http://localhost:8000`.

## Lưu ý về mật khẩu

Website tĩnh không có máy chủ nên mật khẩu chỉ là một lớp tạo bất ngờ và vẫn có thể được xem trong mã nguồn. Không nên đăng thông tin riêng tư hoặc nhạy cảm. Muốn bảo mật thật sự, cần dùng dịch vụ đăng nhập hoặc máy chủ xác thực.
