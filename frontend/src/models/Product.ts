

export default class Product {
  constructor(
    public id: number,
    public name?: string,
    public description?: string,
    public price: number = 0,
    public added_on?: string,
    public image?: string,
    public is_active: boolean = true,
    public category?: string,
  ) {}
}
