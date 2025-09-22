import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">DR</span>
              </div>
              <span className="text-white text-xl font-bold">
                Destiny <span className="text-orange-400">Rising</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your complete database for everything in the Destiny Rising universe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.702 0 1.04.219 1.04 1.219 0 .739-.469 1.848-.719 2.872-.199.839.419 1.219 1.248 1.219 1.498 0 2.648-1.578 2.648-3.859 0-2.018-1.448-3.437-3.518-3.437-2.398 0-3.806 1.797-3.806 3.657 0 .724.279 1.219.629 1.219.145 0 .279-.041.384-.145.105-.104.145-.219.145-.359 0-.419-.279-.798-.279-1.378 0-1.142.898-1.995 2.118-1.995 1.219 0 2.018.898 2.018 2.098 0 1.259-.839 2.278-1.998 2.278-.419 0-.798-.199-1.038-.479-.279.419-.419.898-.419 1.378 0 .599.219 1.178.599 1.618.419.439.998.679 1.598.679 2.398 0 4.317-1.938 4.317-4.317C23.987 5.367 18.618.029 12.017.029z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-3">
              <li><Link href="/items" className="text-gray-400 hover:text-orange-400 transition-colors">All Items</Link></li>
              <li><Link href="/weapons" className="text-gray-400 hover:text-orange-400 transition-colors">Weapons</Link></li>
              <li><Link href="/armor" className="text-gray-400 hover:text-orange-400 transition-colors">Armor</Link></li>
              <li><Link href="/artifacts" className="text-gray-400 hover:text-orange-400 transition-colors">Artifacts</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-orange-400 transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/categories/weapons" className="text-gray-400 hover:text-orange-400 transition-colors">Weapons</Link></li>
              <li><Link href="/categories/armor" className="text-gray-400 hover:text-orange-400 transition-colors">Armor</Link></li>
              <li><Link href="/categories/artifacts" className="text-gray-400 hover:text-orange-400 transition-colors">Artifacts</Link></li>
              <li><Link href="/categories/resources" className="text-gray-400 hover:text-orange-400 transition-colors">Resources</Link></li>
              <li><Link href="/categories/maps" className="text-gray-400 hover:text-orange-400 transition-colors">Maps</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/search" className="text-gray-400 hover:text-orange-400 transition-colors">Advanced Search</Link></li>
              <li><Link href="/compare" className="text-gray-400 hover:text-orange-400 transition-colors">Item Compare</Link></li>
              <li><Link href="/collections" className="text-gray-400 hover:text-orange-400 transition-colors">Collections</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-orange-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Destiny Rising Database. This is a fan-made project and is not affiliated with Bungie or NetEase Games.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/api" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}