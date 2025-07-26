"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 text-neutral-400 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Section */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">FootballX</h3>
            <p className="max-w-xs">
              The ultimate destination for real-time stats, tactical insights, and everything football.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Live Scores</a></li>
              <li><a href="#" className="hover:text-white">Tactics</a></li>
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <p className="mb-2">contact@pulsefootball.com</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} FootballX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
