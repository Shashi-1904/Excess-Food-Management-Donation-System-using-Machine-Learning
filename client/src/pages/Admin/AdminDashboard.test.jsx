import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../../store/auth";
import { Bar } from 'react-chartjs-2';

vi.mock("../../store/auth", () => ({
    useAuth: vi.fn(),
}));

// Mock Chart rendering to avoid errors during tests
vi.mock('react-chartjs-2', () => ({
    Bar: () => <div>Mocked Bar Chart</div>,
}));

describe("AdminDashboard Component", () => {
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

    it("renders the Admin Dashboard correctly", () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        expect(screen.getByText("Welcome, Admin!")).toBeInTheDocument();
        expect(screen.getByText("Manage donations, track user activities, and view analytics from here.")).toBeInTheDocument();
        expect(screen.getByText("Recent Activities")).toBeInTheDocument();
    });



    it("renders the bar chart", () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        expect(screen.getByText("Mocked Bar Chart")).toBeInTheDocument();
    });


});
