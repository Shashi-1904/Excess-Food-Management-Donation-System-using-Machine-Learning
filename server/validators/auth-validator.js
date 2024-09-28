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
        .enum(['hotel', 'donor', 'volunteer'], { required_error: "Role is required" })
        .refine((value) => ['hotel', 'donor', 'volunteer'].includes(value), {
            message: "Role must be one of: hotel, donor, volunteer",
        }),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, { message: "Address must be at least 5 characters long." }),
});

module.exports = { signupSchema, loginSchema };
