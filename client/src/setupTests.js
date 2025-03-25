import '@testing-library/jest-dom';
import { vi } from "vitest";

// Mock fetch globally
global.fetch = vi.fn().mockImplementation((url, options) => {
    if (url.includes("/api/hotel/add-log")) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: "Log added successfully" })
        });
    }
    return Promise.reject(new Error("Unknown API call"));
});

// Mock toast notifications
vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));
