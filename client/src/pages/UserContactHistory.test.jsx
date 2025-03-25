import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import UserContactHistory from "./UserContactHistory";
import { useAuth } from "../store/auth";

vi.mock("../store/auth", () => ({
    useAuth: vi.fn(),
}));

describe("UserContactHistory Component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            authorizationToken: "mockToken",
            API: "http://localhost:3000",
        });

        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the contact history page correctly", () => {
        render(
            <MemoryRouter>
                <UserContactHistory />
            </MemoryRouter>
        );

        expect(screen.getByText("Contact History")).toBeInTheDocument();
        expect(screen.getByText("View your past inquiries and responses from the Admin")).toBeInTheDocument();
    });

    it("handles empty contact history gracefully", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                data: [],
            }),
        });

        render(
            <MemoryRouter>
                <UserContactHistory />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("No messages found.")).toBeInTheDocument();
        });
    });

    it("handles fetch errors gracefully", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Network error"));

        render(
            <MemoryRouter>
                <UserContactHistory />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });
});
