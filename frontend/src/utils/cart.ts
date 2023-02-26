import OrderDetail from "../models/OrderDetail";
import Product from "../models/Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyAdded = () => toast("Added! ");
const notifyExists = () => toast("Product allready exists! ");
const notifyRemoved = () => toast("Removed! ");

export function addToCart(item: Product) {


    // Check if the item already exists in the cart
  


    const productToAdd= new OrderDetail(item)

    if (itemExistsInList(item)) {
      notifyExists()
            return;
    }
  
    // Retrieve the existing list of items from local storage
    const existingListJson = localStorage.getItem("cart");
    const existingList = existingListJson ? JSON.parse(existingListJson) : [];
  
    // Add the new item to the list
    existingList.push(productToAdd);
  
    // Save the updated list back to local storage
    const updatedListJson = JSON.stringify(existingList);
    localStorage.setItem("cart", updatedListJson);

    notifyAdded()
  }
  
  
export function itemExistsInList(item: Product): boolean {
    const list = JSON.parse(localStorage.getItem("cart") || '[]');
    return list.some(
      (orderDetail: OrderDetail) => orderDetail.product?.id === item.id
    );  }
  
  
    // export function removeFromCart(item: Product) {
    //     const list = JSON.parse(localStorage.getItem("cart") || '[]');  
    //     const orderDetailList: OrderDetail[] = JSON.parse(list);
    //     const index = orderDetailList.findIndex(
    //       (d) => d.product.id === item.id
    //     );
    //     if (index !== -1) {
    //       orderDetailList.splice(index, 1);
    //       localStorage.setItem("cart", JSON.stringify(orderDetailList));
    //     }
  
    //     }


    export function removeFromCart(item: Product): void {
      const list: string | null = localStorage.getItem('cart');
      if (!list) {
        throw new Error('Cart is not defined in local storage');
      }
    
      const orderDetailList: OrderDetail[] = JSON.parse(list);
      if (!Array.isArray(orderDetailList)) {
        throw new Error('Cart items are not in expected format');
      }
    
      const updatedOrderDetailList = orderDetailList.filter(
        (d) => d.product.id !== item.id
      );
      notifyRemoved()
      localStorage.setItem('cart', JSON.stringify(updatedOrderDetailList));
    }
    


 
     