import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "./Homepage";
import { describe, it, expect } from "vitest";

describe("Homepage Component", () => {
    it("renders the Homepage correctly", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );

        // ✅ Use regular expression matching for flexibility
        expect(screen.getByText(/Welcome to ServeSurplus/i)).toBeInTheDocument();
        expect(screen.getByText(/Be part of the change/i)).toBeInTheDocument();
        expect(screen.getByText(/Are You Ready?/i)).toBeInTheDocument();

        // ✅ Flexible matcher for multi-line or nested text
        expect(
            screen.getByText((content, node) => {
                const hasText = (text) => text.includes("Join us in tackling food waste and hunger");
                const nodeHasText = hasText(node.textContent);
                const childrenDontHaveText = Array.from(node.children).every(
                    (child) => !hasText(child.textContent)
                );
                return nodeHasText && childrenDontHaveText;
            })
        ).toBeInTheDocument();

        // ✅ Verify navigation links
        expect(screen.getByText("Donate Food!").closest("a")).toHaveAttribute("href", "/donatefood");
        expect(screen.getByText("Learn More").closest("a")).toHaveAttribute("href", "/about");
        expect(screen.getByText("Contact Us").closest("a")).toHaveAttribute("href", "/contact");
    });

    it("renders images correctly", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );

        const foodImage = screen.getByAltText("Food Donation");
        const volunteerImage = screen.getByAltText("Volunteering");

        expect(foodImage).toBeInTheDocument();
        expect(volunteerImage).toBeInTheDocument();
    });
});
