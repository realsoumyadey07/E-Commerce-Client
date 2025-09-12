export default function MinFooter() {
  return (
    <footer className="bg-[#ff0000] text-gray-300 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="#" className="text-white">
            Returns Policy
          </a>
          <span>|</span>
          <a href="#" className="text-white">
            Terms of Use
          </a>
          <span>|</span>
          <a href="#" className="text-white">
            Security
          </a>
          <span>|</span>
          <a href="#" className="text-white">
            Privacy
          </a>
        </div>
        <p className="text-sm text-gray-400">
          © 2024-2025{" "}
          <span className="font-semibold text-white">Bijoyjewellers.com</span>
        </p>
      </div>
    </footer>
  );
}
