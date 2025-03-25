import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import GetRecommendation from "./GetRecommendation";
import { useAuth } from "../../store/auth";

// Mocking `react-toastify`
vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
    },
}));

// Mocking `useAuth` to simulate authentication context
vi.mock("../../store/auth", () => ({
    useAuth: vi.fn(),
}));

// Mocking `fetch` globally
const mockFetch = vi.fn();

global.fetch = mockFetch;

describe("GetRecommendation Component", () => {
    const API = "http://127.0.0.1:5000";
    const mockUser = { email: "volunteer@example.com" };

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({ user: mockUser });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the component with loading spinner initially", () => {
        render(<GetRecommendation />);
        expect(screen.getByText("Fetching recommendations...")).toBeInTheDocument();
    });

    it("fetches and displays recommendations", async () => {
        // Mock successful response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                recommendations: [
                    ["Location 1"],
                    ["Location 2"],
                    ["Location 3"]
                ]
            })
        });

        render(<GetRecommendation />);

        await waitFor(() => {
            expect(screen.getByText("Location : Location 1")).toBeInTheDocument();
            expect(screen.getByText("Location : Location 2")).toBeInTheDocument();
            expect(screen.getByText("Location : Location 3")).toBeInTheDocument();
        });
    });

    it("shows error toast on fetch failure", async () => {
        // Mock failed response
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                message: "Failed to fetch recommendations"
            })
        });

        render(<GetRecommendation />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Failed to fetch recommendations");
        });
    });

    it("displays 'No recommendations available' when the list is empty", async () => {
        // Mock empty recommendations
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                recommendations: []
            })
        });

        render(<GetRecommendation />);

        await waitFor(() => {
            expect(screen.getByText("No recommendations available at the moment.")).toBeInTheDocument();
        });
    });

    it("renders the 'Get Route' button for each recommendation", async () => {
        // Mock successful recommendations
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                recommendations: [["Location 1"], ["Location 2"]]
            })
        });

        render(<GetRecommendation />);

        await waitFor(() => {
            const buttons = screen.getAllByText("Get Route");
            expect(buttons.length).toBe(2);
        });
    });
});
