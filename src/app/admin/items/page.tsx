import Link from 'next/link';

export default function AdminItemsPage() {
  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-white">Items</h1>
          <p className="mt-2 text-sm text-gray-300">
            Manage all weapons, armor, artifacts, and other items in your database.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/items/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Add Item
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="destiny-card mb-6">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">Filters</h3>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-white shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
              >
                <option value="">All Categories</option>
                <option value="weapons">Weapons</option>
                <option value="armor">Armor</option>
                <option value="artifacts">Artifacts</option>
                <option value="resources">Resources</option>
                <option value="maps">Maps</option>
              </select>
            </div>
            <div>
              <label htmlFor="rarity" className="block text-sm font-medium text-gray-300 mb-1">
                Rarity
              </label>
              <select
                id="rarity"
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-white shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
              >
                <option value="">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="legendary">Legendary</option>
                <option value="exotic">Exotic</option>
              </select>
            </div>
            <div>
              <label htmlFor="element" className="block text-sm font-medium text-gray-300 mb-1">
                Element
              </label>
              <select
                id="element"
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-white shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
              >
                <option value="">All Elements</option>
                <option value="kinetic">Kinetic</option>
                <option value="arc">Arc</option>
                <option value="solar">Solar</option>
                <option value="void">Void</option>
                <option value="stasis">Stasis</option>
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search items..."
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="destiny-card">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">Items</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rarity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Element
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-white">No items</h3>
                    <p className="mt-1 text-sm text-gray-400">Get started by creating your first item.</p>
                    <div className="mt-6">
                      <Link
                        href="/admin/items/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Item
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}