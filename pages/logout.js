import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("UserCookie");
        router.push("/");
        alert("User logged out successfully!");
        window.location.reload();
      } else {
        alert("Logout failed.");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      alert("An error occurred during logout.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
