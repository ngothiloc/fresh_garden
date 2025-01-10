document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Lấy dữ liệu từ localStorage
  const productList = document.getElementById("localStorage-products"); // Chọn danh sách có ID "localStorage-products"
  let subtotal = 0; // Khởi tạo biến tổng tiền

  if (productList) {
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const productHTML = `
            <li class="list-group-item px-4 py-3">
                <div class="row align-items-center">
                    <div class="col-2 col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" />
                    </div>
                    <div class="col-5 col-md-5">
                        <h6 class="mb-0">${item.name}</h6>
                        <span><small class="text-muted">Giá: ${formatPrice(item.price)}</small></span>
                    </div>
                    <div class="col-2 col-md-1 text-center text-muted">
                        <span>${item.quantity}</span>
                    </div>
                    <div class="col-3 text-lg-end text-start text-md-end col-md-4">
                        <span class="fw-bold">${formatPrice(itemTotal)}</span>
                    </div>
                </div>
            </li>`;
      productList.insertAdjacentHTML("beforeend", productHTML);
    });

    const subtotalHTML = `
        <li class="list-group-item px-4 py-3">
            <div class="d-flex align-items-center justify-content-between fw-bold">
                <div>Subtotal</div>
                <div>${formatPrice(subtotal)}</div>
            </div>
        </li>`;
    productList.insertAdjacentHTML("beforeend", subtotalHTML);
  }

  // Xử lý sự kiện khi nhấn "Place Order"
  const placeOrderButton = document.getElementById("placeOrderButton");

  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const paymentMethod = document.getElementById("paymentMethod").value;

      // Kiểm tra xem người dùng đã chọn phương thức thanh toán chưa
      if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán.");
        return;
      }

      // Dữ liệu giả lập (thay thế bằng dữ liệu thực trong ứng dụng)
      const orderData = {
        full_name: document.getElementById("fullName").value, // Đảm bảo lấy đúng trường 'Họ và tên'
        phone_number: document.getElementById("phoneNumber").value,
        address: document.getElementById("address").value,
        payment_method: paymentMethod, // Lấy giá trị từ <select>
        products: (JSON.parse(localStorage.getItem("cart")) || []).map(product => ({
          product_id: product.id,   // Thay id bằng product_id
          quantity: product.quantity,
          price: product.price
        }))
      };

      console.log(orderData); // Kiểm tra dữ liệu gửi lên

      try {
        const response = await fetch("http://localhost:3000/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          // Lưu trạng thái thông báo vào localStorage trước khi tải lại trang
          setOrderSuccessNotification();
          localStorage.removeItem("cart"); // Xóa giỏ hàng
          window.location.reload(); // Tải lại trang để hiển thị thông báo
        } else {
          const errorData = await response.text(); // Lấy chi tiết lỗi
          alert(`Đã xảy ra lỗi khi tạo đơn hàng: ${errorData}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
      }
    });
  }

  // Hiển thị thông báo khi đơn hàng được tạo thành công
  function showOrderSuccessNotification() {
    const notification = document.createElement('div');
    notification.id = 'order-success-notification';
    notification.textContent = 'Đơn hàng đã được tạo thành công!';

    // Thêm thông báo vào body
    document.body.appendChild(notification);

    // Hiển thị thông báo sau khi thêm vào DOM
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Ẩn và xóa thông báo sau 3 giây
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  }

  // Lưu trạng thái hiển thị thông báo vào localStorage
  function setOrderSuccessNotification() {
    localStorage.setItem('orderSuccessNotification', 'true');
  }

  // Kiểm tra và hiển thị thông báo khi trang được tải lại
  function checkOrderSuccessNotification() {
    const orderSuccess = localStorage.getItem('orderSuccessNotification');
    if (orderSuccess === 'true') {
      showOrderSuccessNotification();
      // Xóa trạng thái sau khi đã hiển thị thông báo
      localStorage.removeItem('orderSuccessNotification');
    }
  }

  // Gọi hàm checkOrderSuccessNotification khi trang được tải lại
  window.addEventListener('load', checkOrderSuccessNotification);

});

function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
  return `${formattedPrice}.000 VND`;
}