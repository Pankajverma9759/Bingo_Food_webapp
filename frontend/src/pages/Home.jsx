import React from "react";
import { FaSearch, FaMotorcycle, FaHamburger } from "react-icons/fa";

export default function Home() {
  const primaryColor = "#ff4d2d";

  return (
    <div className="w-full min-h-screen bg-[#fff9f6]">

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1
          className="text-2xl font-bold"
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>

        <div className="flex gap-6 font-medium">
          <span className="cursor-pointer hover:text-orange-500">
            Home
          </span>
          <span className="cursor-pointer hover:text-orange-500">
            Restaurants
          </span>
          <span className="cursor-pointer hover:text-orange-500">
            Orders
          </span>
          <span className="cursor-pointer hover:text-orange-500">
            Profile
          </span>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Delicious Food <br />
            Delivered To Your Door 🚀
          </h1>

          <p className="text-gray-600 mb-6">
            Order food from your favourite restaurants near you.
            Fast delivery, fresh meals and amazing taste.
          </p>

          {/* Search */}
          <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search food or restaurant..."
              className="flex-1 px-4 py-3 outline-none"
            />
            <button
              className="px-6 text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="food"
          className="w-96 mt-10 md:mt-0"
        />
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Vingo?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaHamburger
              size={40}
              className="mx-auto text-orange-500 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">
              Quality Food
            </h3>
            <p className="text-gray-600">
              Fresh and hygienic food from top restaurants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaMotorcycle
              size={40}
              className="mx-auto text-orange-500 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Super fast delivery at your doorstep.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaSearch
              size={40}
              className="mx-auto text-orange-500 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">
              Easy Ordering
            </h3>
            <p className="text-gray-600">
              Search, select and order in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* ================= POPULAR FOOD ================= */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-bold mb-8">
          Popular Dishes 🍕
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Pizza",
            "Burger",
            "Biryani",
            "Pasta",
          ].map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition"
            >
              <img
                src="https://source.unsplash.com/300x200/?food"
                alt={food}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {food}
                </h3>
                <p className="text-gray-500">
                  Starting from ₹149
                </p>

                <button
                  className="mt-3 w-full text-white py-2 rounded-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p>© 2026 Vingo Food Delivery. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
