export type MenuItem = {
  name: string;
  desc: string;
  single?: number;
  double?: number;
  price?: number;
};

export const beefBurgers: MenuItem[] = [
  { name: "Classic Burger", desc: "Brioche, ketchup, mayo, mustard, american cheese, lettuce, tomato, onion.", single: 13000, double: 18000 },
  { name: "Cheese Burger", desc: "Brioche, ketchup, mayo, mustard, pickles, american cheese, cheese sauce.", single: 14000, double: 19000 },
  { name: "Tropical Burger", desc: "Brioche, barbecue sauce, mayo, grilled pineapple, american cheese.", single: 15000, double: 20000 },
  { name: "Mushroom Burger", desc: "Brioche, mushroom sauce, american cheese.", single: 16000, double: 21000 },
  { name: "Jalapeño Burger", desc: "Brioche, sriracha mayo, american cheese, lettuce, jalapeño.", single: 16000, double: 21000 },
  { name: "Beef Bacon Burger", desc: "Brioche, texas sauce, pickles, american cheese, bacon, lettuce, tomato.", single: 17000, double: 22000 },
  { name: "Mediterranean", desc: "Brioche, ketchup, mayo, pickles, american cheese, pastrami, lettuce, tomato.", single: 19000, double: 23000 },
  { name: "Smokey Mushroom", desc: "Brioche, smoky BBQ, lettuce, american cheese, caramelized onion, tomato, mushroom.", single: 18000, double: 22000 },
  { name: "Lord of the Rings", desc: "Brioche, ranch, BBQ, tomato, lettuce, american cheese, bacon, onion rings.", single: 18000, double: 22000 },
  { name: "Gunners Beef", desc: "Brioche, onion rings, ketchup, mayo, american cheese, lettuce, mozzarella sticks.", single: 18000, double: 23000 },
];

export const chickenBurgers: MenuItem[] = [
  { name: "Chicken Fillet", desc: "Brioche, ketchup, mayo, american cheese, crispy chicken, lettuce.", single: 13000, double: 18000 },
  { name: "Spicy Chicken Fillet", desc: "Brioche, sriracha mayo, american cheese, spicy crispy chicken, lettuce.", single: 13000, double: 18000 },
  { name: "Grilled Lemon", desc: "Brioche, thousand island, american cheese, grilled chicken, lettuce, pickles.", single: 13000, double: 18000 },
  { name: "Tandoori Chicken", desc: "Brioche, buffalo sauce, grilled onion, tomato, lettuce, cucumber.", single: 15000, double: 20000 },
  { name: "Butter Chicken", desc: "Brioche, grilled chicken, buffalo sauce, lettuce, tomato, onion, american cheese, coriander.", single: 15000, double: 20000 },
  { name: "Flaky Chicken", desc: "Brioche, fried chicken, american cheese, mushrooms, beef bacon.", single: 18000, double: 23000 },
  { name: "Gunners Chicken", desc: "Brioche, onion rings, ketchup, mayo, american cheese, crispy chicken, mozzarella sticks.", single: 18000, double: 23000 },
  { name: "Jalapeño Chicken", desc: "Brioche, ketchup, mayo, american cheese, crispy chicken, lettuce, jalapeño.", single: 15000, double: 20000 },
];

export const vegBurger: MenuItem[] = [
  { name: "Veg Classic Burger", desc: "Brioche, ketchup, mayo, mustard, american cheese, lettuce, tomato, onion.", single: 15000, double: 18000 },
];

export const kidsMenu: MenuItem[] = [
  { name: "Kids Chicken Burger", desc: "Brioche, juice, french fries, toys.", price: 15000 },
  { name: "Kids Beef Burger", desc: "Brioche, juice, french fries, toys.", price: 15000 },
  { name: "Nuggets Meal", desc: "Brioche, juice, french fries, toys.", price: 15000 },
];

export const sides: MenuItem[] = [
  { name: "Fries", desc: "Golden & crispy.", price: 4000 },
  { name: "Coleslaw", desc: "Cool & creamy.", price: 2000 },
  { name: "Onion Rings (4 pcs)", desc: "Crunchy rings.", price: 3000 },
  { name: "Caramelized Onion", desc: "Sweet & savory.", price: 2000 },
  { name: "Mozzarella (2 pcs)", desc: "Melty sticks.", price: 4000 },
];

export const sauces: MenuItem[] = [
  { name: "Buffalo", desc: "", price: 2000 },
  { name: "Smoky BBQ", desc: "", price: 2000 },
  { name: "Ranch", desc: "", price: 2000 },
  { name: "Cheddar Cheese", desc: "", price: 2000 },
  { name: "Thousand Island", desc: "", price: 2000 },
  { name: "Texas", desc: "", price: 2000 },
  { name: "Sriracha", desc: "", price: 2000 },
];

export const drinks: MenuItem[] = [
  { name: "Water", desc: "", price: 2000 },
  { name: "Pepsi", desc: "Soda", price: 2000 },
  { name: "Pepsi Diet", desc: "Soda", price: 2000 },
  { name: "Mirinda Orange", desc: "Soda", price: 2000 },
  { name: "Mirinda Black Currant", desc: "Soda", price: 2000 },
  { name: "Seven Up", desc: "Soda", price: 2000 },
];

export const fmt = (n: number) => n.toLocaleString() + " UGX";
