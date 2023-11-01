// Hàm chuyển số thành chuỗi định dạng "xxx.xxxđ"
export const formatCurrency = (value) => {
    // Kiểm tra xem value có phải là số không
    if (typeof value !== 'number') {
        return value; // Trả về nguyên giá trị nếu không phải số
    }

    // Sử dụng hàm toLocaleString để định dạng số và thêm đơn vị đồng (đ)
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};


export const formatTime = (value) => {
    const time = new Date(value);
    return time.getHours() + ":" + time.getMinutes();
}

export const renderTitleButtonProcessOrder = (status) => {
    switch (status) {
        case 't1':
            return "Xác nhận";
        // break;
        case 't2':
            return "Hoàn thành";
        case 't3':
            return "Giao đơn"

        default:
            break;
    }
}