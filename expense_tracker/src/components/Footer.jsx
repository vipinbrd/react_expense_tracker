export function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 py-6 mt-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} My Store. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 text-sm">
            <a href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-500 transition">Terms of Service</a>
            <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  