// import Product from "./Product"

// export default class OrderDetail{
//     // id?:string=''
//     // order?:Order
//     quantity:number=1
//     product?:Product

// }
import Product from "./Product";

export default class OrderDetail {
  quantity: number;
  product: Product;

  constructor(product: Product, quantity: number = 1) {
    this.quantity = quantity;
    this.product = product;
  }
}

export class OrderDetailSeri {
  quantity: number;
  product: number;

  constructor(product: number = 0, quantity: number = 1) {
    this.quantity = quantity;
    this.product = product;
  }
}
