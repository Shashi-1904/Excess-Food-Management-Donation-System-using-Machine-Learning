import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Settings from "./Settings";
import { useAuth } from "../../store/auth";

// Mock useAuth
vi.mock("../../store/auth", () => ({
    useAuth: vi.fn(),
}));

describe("Settings Component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            user: {
                username: "Hotel Deluxe",
                email: "hotel@deluxe.com",
                address: "123 Main Street, Cityville"
            }
        });

        localStorage.clear();
    });

    // ✅ Test 1: Renders user profile details correctly
    it("renders hotel profile information", () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        );

        expect(screen.getByText(/Hotel Deluxe/i)).toBeInTheDocument();
        expect(screen.getByText(/hotel@deluxe.com/i)).toBeInTheDocument();
        expect(screen.getByText(/123 Main Street, Cityville/i)).toBeInTheDocument();
    });


    // ✅ Test 2: Navigates to the profile update page
    it("navigates to the profile update page", async () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        );

        const profileLink = screen.getByText(/Update Profile/i);

        expect(profileLink.closest("a")).toHaveAttribute("href", "/profile");
    });

});
