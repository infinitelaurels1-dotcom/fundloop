import "./globals.css";

export const metadata = {
  title: "FundLoop",
  description: "Smart Contribution Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">FundLoop</h1>
        </nav>

        <div className="p-6">
          {children}
        </div>
      </body>
    </html>
  );
}