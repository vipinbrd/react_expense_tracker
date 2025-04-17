export function Profile() {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="flex items-start justify-between gap-8">
          {/* Left Sticky Motivational Quote */}
          <div className="sticky top-8 text-gray-700 text-sm md:text-base w-1/3 bg-white p-6 rounded-lg shadow-md">
            <p className="font-medium">"Winner never quits, quitter never wins."</p>
            <p className="mt-4 text-xs text-gray-500">
              Keep pushing forward and you'll achieve greatness!
            </p>
          </div>
  
          {/* Form Section */}
          <div className="w-full max-w-4xl flex-1 bg-white p-6 rounded-lg shadow-md">
            {/* Divider */}
            <hr className="border-t border-gray-300 mb-6" />
  
            {/* Contact Form */}
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h1>
            <form className="flex flex-col gap-6">
              {/* Inputs side-by-side on medium+ screens */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
  
                <div className="flex-1">
                  <label htmlFor="image" className="block text-sm text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="w-full"
                  />
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="flex gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
  
          {/* Right Sticky Profile Progress */}
          <div className="sticky top-8 text-blue-700 text-sm md:text-base w-1/3 bg-white p-6 rounded-lg shadow-md">
            <p className="font-medium">Your profile is <span className="font-semibold">64%</span> complete.</p>
            <p className="mt-4 text-xs text-gray-500">
              Complete profiles have a higher chance of getting selected.
            </p>
          </div>
        </div>
      </div>
    );
  }
  