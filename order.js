class Order {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async createOrder(formData, articleName, amount) {
    const orderData = {
      user_id: '',
      name: formData.get('name'),
      address: formData.get('address'),
      city: formData.get('city'),
      postal_code: formData.get('postal_code'),
      phone_number: formData.get('phone_number'),
      promo_code: formData.get('promo_code'),
      price: formData.get('cartTotal'),
      article_name: articleName,
      amount: amount
    };

    try {
      const response = await fetch(`${this.apiUrl}/order`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error creating order');
      }

      alert('Order successfully sent. You will receive instructions by email whether it is confirmed or rejected!');
    } catch (error) {
      console.error(error);
      alert('Error creating order');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('order-form');
  const myOrder = new Order('https://63fb27534e024687bf72db88.mockapi.io');

  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the form from submitting normally
    
    const formData = new FormData(event.target);
    const articleName = $('#product-name-input').val();
    const amount = $('#product-quantity-input').val();
    await myOrder.createOrder(formData, articleName, amount);
  });
});

// find all add to cart buttons and add click event listener
$('.cd-add-to-cart').on('click', function(event) {
  event.preventDefault();
  
  // get product price, ID, name, and quantity
  const price = parseFloat($(this).data('price'));
  const productId = $(this).closest('.product-card').attr('id');
  const productName = $(this).closest('.product-card').find('.product-name').text();
  const productQuantity = $(this).closest('.product-card').find('.product-quantity').val();
  
  // set the product name and quantity in the order form
  $('#product-name').text(productName);
  $('#product-quantity').text(productQuantity);
  $('#product-name-input').val(productName);
  $('#product-quantity-input').val(productQuantity);
  
  // make POST request to API
  $.ajax({
    type: 'POST',
    url: 'https://63fb27534e024687bf72db88.mockapi.io/products',
    data: {
      price: price,
      product_id: productId,
      product_name: productName,
      product_quantity: productQuantity
    },
    success: function(response) {
      console.log('Data sent to API:', response);
    },
    error: function(error) {
      console.error('Error sending data to API:', error);
    }
  });
});