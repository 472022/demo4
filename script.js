document.addEventListener("DOMContentLoaded", function() {
  const addProductForm = document.getElementById("addProductForm");
  const messageDiv = document.getElementById("message");

  // Listen for form submission (Add or Edit)
  addProductForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form values
    const productKey = document.getElementById("productKey").value;
    const product = document.getElementById("product").value;
    const name_of_company1 = document.getElementById("name_of_company1").value;
    const item_name = document.getElementById("item_name").value;
    const name_company = document.getElementById("name_company").value;
    const product_name = document.getElementById("product_name").value;
    const product_other_name = document.getElementById("product_other_name").value;
    const product_type = document.getElementById("product_type").value;
    const qty = document.getElementById("qty").value;
    const unit = document.getElementById("unit").value;
    const supplier1 = document.getElementById("supplier1").value;
    const supplier2 = document.getElementById("supplier2").value;
    const supplier3 = document.getElementById("supplier3").value;
    const purchase_rate = document.getElementById("purchase_rate").value;
    const sales_rate = document.getElementById("sales_rate").value;
    const wholesale_rate = document.getElementById("wholesale_rate").value;
    const dist_category = document.getElementById("dist_category").value;
    const additional_notes = document.getElementById("additional_notes").value;
    const no_of_pkg = document.getElementById("no_of_pkg").value;
    const gross_wt = document.getElementById("gross_wt").value;
    const other_details = document.getElementById("other_details").value;

    // Create product object
    const newProduct = {
      product,
      name_of_company1,
      item_name,
      name_company,
      product_name,
      product_other_name,
      product_type,
      qty,
      unit,
      supplier1,
      supplier2,
      supplier3,
      purchase_rate,
      sales_rate,
      wholesale_rate,
      dist_category,
      additional_notes,
      no_of_pkg,
      gross_wt,
      other_details,
      created_at: new Date().toISOString()
    };

    // If productKey exists, update the existing record; else, create a new one.
    if (productKey) {
      // Update product
      var productRef = database.ref('products/' + productKey);
      productRef.set(newProduct, function(error) {
        if (error) {
          messageDiv.innerHTML = '<div class="text-red-500">Error updating product.</div>';
        } else {
          messageDiv.innerHTML = '<div class="text-green-500">Product updated successfully!</div>';
          addProductForm.reset();
        }
      });
    } else {
      // Create new product
      var newProductRef = database.ref('products').push();
      newProductRef.set(newProduct, function(error) {
        if (error) {
          messageDiv.innerHTML = '<div class="text-red-500">Error saving product.</div>';
        } else {
          messageDiv.innerHTML = '<div class="text-green-500">Product saved successfully!</div>';
          addProductForm.reset();
        }
      });
    }
  });

  // Delete product function
  window.deleteProduct = function(key) {
    if (confirm("Are you sure you want to delete this product?")) {
      database.ref('products/' + key).remove()
        .then(function() {
          messageDiv.innerHTML = '<div class="text-green-500">Product deleted successfully!</div>';
        })
        .catch(function(error) {
          messageDiv.innerHTML = '<div class="text-red-500">Error deleting product.</div>';
        });
    }
  };

  // Edit product function: populate the form with product data for editing.
  window.editProduct = function(key) {
    database.ref('products/' + key).once('value').then(function(snapshot) {
      const product = snapshot.val();
      document.getElementById("productKey").value = key;
      document.getElementById("product").value = product.product || '';
      document.getElementById("name_of_company1").value = product.name_of_company1 || '';
      document.getElementById("item_name").value = product.item_name || '';
      document.getElementById("name_company").value = product.name_company || '';
      document.getElementById("product_name").value = product.product_name || '';
      document.getElementById("product_other_name").value = product.product_other_name || '';
      document.getElementById("product_type").value = product.product_type || '';
      document.getElementById("qty").value = product.qty || '';
      document.getElementById("unit").value = product.unit || '';
      document.getElementById("supplier1").value = product.supplier1 || '';
      document.getElementById("supplier2").value = product.supplier2 || '';
      document.getElementById("supplier3").value = product.supplier3 || '';
      document.getElementById("purchase_rate").value = product.purchase_rate || '';
      document.getElementById("sales_rate").value = product.sales_rate || '';
      document.getElementById("wholesale_rate").value = product.wholesale_rate || '';
      document.getElementById("dist_category").value = product.dist_category || '';
      document.getElementById("additional_notes").value = product.additional_notes || '';
      document.getElementById("no_of_pkg").value = product.no_of_pkg || '';
      document.getElementById("gross_wt").value = product.gross_wt || '';
      document.getElementById("other_details").value = product.other_details || '';
    });
  };

  // Listen for product changes and update the product list table
  var productsRef = database.ref('products');
  productsRef.on('value', function(snapshot) {
    var productList = document.getElementById("productList");
    productList.innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var product = childSnapshot.val();
      productList.innerHTML += `
        <tr>
          <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">${product.product_name || ''}</td>
          <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">${product.dist_category || ''}</td>
          <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">${product.sales_rate || ''}</td>
          <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
            <button onclick="editProduct('${key}')" class="text-custom hover:text-custom/80 mr-3">
              <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteProduct('${key}')" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  });
});
