const { z } = require("zod");

// login
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long." })
        .max(255, { message: "Email must not be more than 255 characters." }),

    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least 7 characters long." })
        .max(1024, { message: "Password must not be more than 1024 characters." }),
});

// register 
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(255, { message: "Username must not be more than 255 characters." }),

    phoneNumber: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters long." })
        .max(20, { message: "Phone number must not be more than 20 characters." }),


    role: z
        .enum(['hotel', 'donor', 'volunteer', 'NGO'], { required_error: "Role is required" })
        .refine((value) => ['hotel', 'donor', 'volunteer', 'NGO'].includes(value), {
            message: "Role must be one of: hotel, donor, volunteer",
        }),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, { message: "Address must be at least 5 characters long." }),
});


// Extend the signupSchema for the food donation form
const foodDonationSchema = z.object({
    foodName: z
        .string({ required_error: "Food name is required" })
        .trim()
        .min(3, { message: "Food name must be at least 3 characters long." })
        .max(255, { message: "Food name must not be more than 255 characters." }),

    foodType: z
        .enum(['veg', 'non-veg'], { required_error: "Food type is required" })
        .refine((value) => ['veg', 'non-veg'].includes(value), {
            message: "Food type must be one of: veg, non-veg",
        }),

    category: z
        .enum(['raw', 'cooked', 'packed'], { required_error: "Food category is required" })
        .refine((value) => ['raw', 'cooked', 'packed'].includes(value), {
            message: "Category must be one of: raw, cooked, packed",
        }),

    quantity: z
        .number({ required_error: "Quantity is required" })
        .min(1, { message: "Quantity must be at least 1 person." })
        .max(1000, { message: "Quantity cannot exceed 1000 persons." }), // Adjust the max as per your requirement

    expiry: z
        .number({ required_error: "Expiry time is required" })
        .min(1, { message: "Expiry time must be at least 1 hour." })
        .max(72, { message: "Expiry time must not exceed 72 hours." }), // Assuming a maximum of 3 days

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long." })
        .max(255, { message: "Email must not be more than 255 characters." }),

    phoneNumber: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters long." })
        .max(20, { message: "Phone number must not exceed 20 characters." }),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, { message: "Address must be at least 5 characters long." })
        .max(255, { message: "Address must not exceed 255 characters." }),
});

const foodRequestSchema = z.object({

    foodType: z
        .enum(['veg', 'non-veg'], { required_error: "Food type is required" })
        .refine((value) => ['veg', 'non-veg'].includes(value), {
            message: "Food type must be one of: veg, non-veg",
        }),

    category: z
        .enum(['raw', 'cooked', 'packed'], { required_error: "Food category is required" })
        .refine((value) => ['raw', 'cooked', 'packed'].includes(value), {
            message: "Category must be one of: raw, cooked, packed",
        }),

    quantityNeeded: z
        .number({ required_error: "Quantity needed is required" })
        .min(1, { message: "Quantity must be at least 1 person." })
        .max(1000, { message: "Quantity cannot exceed 1000 persons." }),

    neededBy: z.coerce.date({ required_error: "A valid date is required for neededBy." }),

    ngoName: z
        .string({ required_error: "NGO name is required" })
        .trim()
        .min(3, { message: "NGO name must be at least 3 characters long." })
        .max(255, { message: "NGO name must not exceed 255 characters." }),

    contactEmail: z
        .string({ required_error: "Contact email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long." })
        .max(255, { message: "Email must not exceed 255 characters." }),

    contactPhone: z
        .string({ required_error: "Contact phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters long." })
        .max(20, { message: "Phone number must not exceed 20 characters." }),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, { message: "Address must be at least 5 characters long." })
        .max(255, { message: "Address must not exceed 255 characters." }),
});



module.exports = { signupSchema, loginSchema, foodDonationSchema, foodRequestSchema };
