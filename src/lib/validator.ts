import { z } from "zod"
import { formatNumberWithDecimal } from "./utils"


const Price = (field: string) => {
    // Coerce means it converts the input into a number e.g "49.56" to 49.56
    return z.coerce.number().refine(
        (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
        { message: `${field} must have exactly two decimal places (e.g., 49.99)` }
    );
}

// This is the validation for product
export const ProductInputSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean(),
  price: Price("Price"),
  listPrice: Price("List Price"),
  countInStock: z.coerce.number().int().nonnegative('count in stock must be a non-negative number'),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce.number().min(0, 'Average must be at least 0').max(5, 'Avergae rating must be at most 5').default(0),
  numReviews: z.coerce.number().int().nonnegative('number of reviews must be a non-negative number'),
  ratingDistribution: z.array(z.object({ rating: z.number(), count: z.number()})).max(5)  ,
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce.number().int().nonnegative('number of sales must be a non-negative number'),

})

// Order Item
export const OrderItemSchema = z.object({
  clientId: z.string().min(1, 'ClientId is required'),
  product: z.string().min(1, 'Product is required'),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.number().int().nonnegative('Quantity must be a non-negative number'),
  countInStock: z.number().int().nonnegative('Count in Stock must be a non-negative number'),
  image: z.string().min(1, 'Image is required'),
  price: Price('Price'),
  size: z.string().optional(),
  color: z.string().optional()
})

export const cartSchema = z.object({
  items: z.array(OrderItemSchema)
  .min(1, 'Order must contain atleast one items'),
  itemsPrice: z.number(),
  taxPrice: z.optional(z.number()),
  shippingPrice: z.optional(z.number()),
  totalPrice: z.number(),
  paymentMethod: z.optional(z.string()),
  deliveryDateIndex: z.optional(z.number()),
  expectedDeliveryDate: z.optional(z.date()),
})