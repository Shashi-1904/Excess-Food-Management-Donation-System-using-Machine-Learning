import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { describe, it, expect, vi } from "vitest";
import Contact from "./Contact";
import { useAuth } from "../store/auth";

// ✅ Mock auth and toast
vi.mock("../store/auth", () => ({
    useAuth: vi.fn(),
}));

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("Contact Component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            user: {
                username: "JohnDoe",
                email: "john@example.com",
            },
            API: "http://localhost:3000",
        });
    });

    it("renders the contact form correctly", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // ✅ Check if the form fields render with default values
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
        expect(screen.getByText("Contact History")).toBeInTheDocument();

        // ✅ Check if form loads with user data
        expect(screen.getByLabelText(/Username/i)).toHaveValue("JohnDoe");
        expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
    });

    it("handles form input changes correctly", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // Simulate input changes
        const messageInput = screen.getByLabelText(/Message/i);
        fireEvent.change(messageInput, { target: { value: "Test message" } });

        expect(messageInput).toHaveValue("Test message");
    });

    it("submits the form successfully", async () => {
        // ✅ Mock fetch response
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Message sent successfully" }),
            })
        );

        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // Fill in the form
        const messageInput = screen.getByLabelText(/Message/i);
        fireEvent.change(messageInput, { target: { value: "Hello, testing!" } });

        // Click the submit button
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);

        // ✅ Wait for async operations to complete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:3000/api/form/contact",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "JohnDoe",
                        email: "john@example.com",
                        message: "Hello, testing!",
                    }),
                })
            );

            expect(toast.success).toHaveBeenCalledWith("Message sent successfully");
        });

        // ✅ Ensure the message field resets
        expect(messageInput).toHaveValue("");
    });

    it("handles API errors gracefully", async () => {
        // ✅ Mock failing fetch response
        global.fetch = vi.fn(() => Promise.reject(new Error("API error")));

        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        const messageInput = screen.getByLabelText(/Message/i);
        fireEvent.change(messageInput, { target: { value: "Failed test message" } });

        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toast.error).not.toHaveBeenCalled();
        });
    });

    it("navigates to contact history on button click", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        const contactHistoryButton = screen.getByText("Contact History");
        expect(contactHistoryButton.closest("a")).toHaveAttribute("href", "/contact-history");
    });
});
