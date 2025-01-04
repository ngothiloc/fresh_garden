function fetchProductDetails(productId) {
    // Giả sử bạn đã có một API hoặc dữ liệu sản phẩm lưu trữ ở đâu đó
    // Đây là ví dụ về cách cập nhật dữ liệu vào modal từ sản phẩm
    const product = getProductById(productId); // Hàm này sẽ lấy thông tin sản phẩm từ API hoặc từ dữ liệu cục bộ

    // Cập nhật thông tin vào modal
    document.getElementById('productModal').innerHTML = '';
    product.thumbnails.forEach(thumbnail => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('zoom');
        imgDiv.style.backgroundImage = `url(${thumbnail})`;
        imgDiv.innerHTML = `<img src="${thumbnail}" alt="Product image" />`;
        document.getElementById('productModal').appendChild(imgDiv);
    });

    // Cập nhật thông tin khác
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price + '.000 VND';
    document.getElementById('productId').textContent = product.id;
}