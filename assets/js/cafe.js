        let cart = [];
        let menuPrices = {
            croffle: 15000,
            espresso: 10000,
            kentanggoreng: 12000,
            late: 13000,
            milktea: 14000,
            moca: 13000,
        }

        function addMenu() {
            let menuInput = document.getElementById("menuInput").value;
            let jumlahInput = parseInt(document.getElementById("jumlahInput").value, 10);

            if (menuInput && !isNaN(jumlahInput) && jumlahInput > 0) {
                // Check if the menu is already in the cart
                let existingItem = cart.find(item => item.menu === menuInput);

                if (existingItem) {
                    // Update quantity if the menu is already in the cart
                    existingItem.jumlah += jumlahInput;
                } else {
                    // Add new item to the cart
                    cart.push({ menu: menuInput, jumlah: jumlahInput });
                }

                // Clear input fields
                document.getElementById("menuInput").value = "";
                document.getElementById("jumlahInput").value = "";

                // Update the cart display
                displayCart();

                // Recalculate total harga
                calculateTotal();
            } else {
                alert("Mohon isi menu dan jumlah dengan benar.");
            }
        }

        function displayCart() {
            let cartItemsElement = document.getElementById("cartItems");
            cartItemsElement.innerHTML = "";

            // Display each item in the cart
            cart.forEach((item, index ) => {
                let li = document.createElement("li");
                li.textContent = `${item.menu}: ${item.jumlah}`;
                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = () => editItem(index);
                li.appendChild(editButton);
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Hapus";
                deleteButton.onclick = () => deleteItem(index);
                li.appendChild(deleteButton);
                cartItemsElement.appendChild(li);
            });
        }

        function calculateTotal() {
            let totalHarga = cart.reduce((total, item) => {
                // You may need to fetch the price of the menu item from somewhere
                // For simplicity, let's assume a fixed price of Rp10,000 per item
                const hargaPerItem = menuPrices[item.menu] || 0;
                return total + item.jumlah * hargaPerItem;
            }, 0);

            document.getElementById("totalHarga").textContent = totalHarga;
        }
        function editItem(menu){
            let newJumlah = prompt("Masukan jumlah baru");
            if (newJumlah !== null && !isNaN(newJumlah) && newJumlah > 0){
                cart[menu].jumlah = parseInt(newJumlah, 10);
                displayCart();
                calculateTotal();
            } else {
                alert("Jumlah tidak valid.");
            }
        }
        function deleteItem(menu){
            if(confirm("Anda yakin ingin menghapus item ini?")) {
                cart.splice(menu, 1);
                displayCart();
                calculateTotal();
            }
        }
        
    