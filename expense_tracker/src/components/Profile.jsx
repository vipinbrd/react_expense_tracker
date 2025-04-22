import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [toast, setToast] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isChanged,setIsChanged]=useState("")

  const navigate = useNavigate();

  async function fetchData() {
    const req = await fetch("http://localhost:8888/user/252");
    const response = await req.json();

    if (req.ok) {
      if (response.name != null) {
        setName(response.name);
      }
      if (response.imageUrl != null) {
        setImageUrl(response.imageUrl);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [isChanged]);

  async function onUpdateProfile(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("userId", 252);

    try {
      const request = await fetch("http://localhost:8888/user/update", {
        method: "PUT",
        body: formData,
      });

      if (!request.ok) {
        throw new Error("Something went wrong..");
      }

      setToast("Profile updated successfully!");
      setIsChanged((pre)=>!pre)

      setTimeout(() => {
        setToast("");
      }, 1500);
    } catch (err) {
      setToast("Something went wrong. Please try again later.");

      setTimeout(() => {
        setToast("");
      }, 1500);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {toast && (
        <p className="mb-4 text-sm text-white bg-green-500 px-4 py-2 rounded shadow-md text-center">
          {toast}
        </p>
      )}

      <div className="flex items-start justify-between gap-8">

      
        <div className="sticky top-8 text-gray-700 text-sm md:text-base w-1/3 bg-white p-6 rounded-lg shadow-md">
          <p className="font-medium">"Winner never quits, quitter never wins."</p>
          <p className="mt-4 text-xs text-gray-500">
            Keep pushing forward and you'll achieve greatness!
          </p>
        </div>

        
        <div className="w-full max-w-4xl flex-1 bg-white p-6 rounded-lg shadow-md">
          <hr className="border-t border-gray-300 mb-6" />

          <h1 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h1>

          <form onSubmit={onUpdateProfile} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
            
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="w-full mb-2"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Current Profile Picture:</p>
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-6 mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={() => navigate("/home")}
                type="button"
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        
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
