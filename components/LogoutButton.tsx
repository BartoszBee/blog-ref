// components/LogoutButton.tsx
import { logoutAction } from "@/app/logout/logoutAction";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="text-sm text-red-600 hover:underline">
        Wyloguj
      </button>
    </form>
  );
}
