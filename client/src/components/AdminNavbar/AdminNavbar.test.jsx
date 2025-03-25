import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../store/auth';

// Mock `useAuth` hook
vi.mock('../../store/auth', () => ({
    useAuth: vi.fn()
}));

describe('AdminNavbar Component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders navbar links properly', () => {
        useAuth.mockReturnValue({
            isLoggedIn: true,
            LogoutUser: vi.fn(),
            user: { email: 'admin@example.com' }
        });

        render(
            <BrowserRouter>
                <AdminNavbar />
            </BrowserRouter>
        );

        // Check if navbar links render correctly
        expect(screen.getByText(/Return to Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();

        // Use `getAllByText` to match both `Settings` links
        const settingsLinks = screen.getAllByText(/Settings/i);
        expect(settingsLinks).toHaveLength(2);
    });

    it('renders sidebar links properly', () => {
        useAuth.mockReturnValue({
            isLoggedIn: true,
            LogoutUser: vi.fn(),
            user: { email: 'admin@example.com' }
        });

        const { getAllByText } = render(
            <MemoryRouter>
                <AdminNavbar />
            </MemoryRouter>
        );

        // Sidebar Links
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/User Management/i)).toBeInTheDocument();
        expect(screen.getByText(/Food Donations/i)).toBeInTheDocument();
        expect(screen.getByText(/Food Requests/i)).toBeInTheDocument();
        expect(screen.getByText(/User Inquiries/i)).toBeInTheDocument();
        const settingsLinks = getAllByText(/Settings/i);
        expect(settingsLinks).toHaveLength(2);  // Expecting both instances
        expect(settingsLinks[0]).toBeInTheDocument();
        expect(settingsLinks[1]).toBeInTheDocument();
    });

    it('calls LogoutUser on logout button click', () => {
        const mockLogout = vi.fn();

        useAuth.mockReturnValue({
            isLoggedIn: true,
            LogoutUser: mockLogout,
            user: { email: 'admin@example.com' }
        });

        render(
            <BrowserRouter>
                <AdminNavbar />
            </BrowserRouter>
        );

        const logoutButton = screen.getByText(/Logout/i);
        fireEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalled();
    });

    it('navigates to correct pages on click', () => {
        useAuth.mockReturnValue({
            isLoggedIn: true,
            LogoutUser: vi.fn(),
            user: { email: 'admin@example.com' }
        });

        const { getAllByText } = render(
            <MemoryRouter>
                <AdminNavbar />
            </MemoryRouter>
        );

        // Verify navigation links are present
        expect(screen.getByText(/Return to Home/i).closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText(/User Management/i).closest('a')).toHaveAttribute('href', '/admin/getusers');
        expect(screen.getByText(/Food Donations/i).closest('a')).toHaveAttribute('href', '/admin/getdonations');
        expect(screen.getByText(/Food Requests/i).closest('a')).toHaveAttribute('href', '/admin/requests');
        expect(screen.getByText(/User Inquiries/i).closest('a')).toHaveAttribute('href', '/admin/contacts');
        // Use `getAllByText()` for multiple Settings links
        const settingsLinks = screen.getAllByText(/Settings/i);
        expect(settingsLinks).toHaveLength(2);
        expect(settingsLinks[0].closest('a')).toHaveAttribute('href', '/admin/settings');
        expect(settingsLinks[1].closest('a')).toHaveAttribute('href', '/admin/settings');
    });
});
