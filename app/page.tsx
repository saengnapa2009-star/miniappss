"use client";

import { useState } from "react";

const foods = [
  {
    id: 1,
    name: "ไก่ย่างซอสพิเศษ",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "เบอร์เกอร์เนื้อ",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "พิซซ่าชีส",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "สเต๊กเนื้อ",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (food: any) => {
    setCart([...cart, food]);
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* TOP BAR */}
      <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-sm">
        <div className="flex gap-6">
          <span>✉ contact@foodieshop.com</span>
          <span>☎ +66 81 234 5678</span>
        </div>

        <div className="flex gap-3">
          <span className="social">f</span>
          <span className="social">t</span>
          <span className="social">ig</span>
          <span className="social">yt</span>
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative min-h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=90')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* NAVBAR */}
        <nav className="relative z-10 flex items-center justify-between px-12 py-5">

          {/* LOGO */}
          <div className="text-white text-4xl font-black tracking-wide">
            FOODIES<span className="text-red-600">HOP</span>
          </div>

          {/* MENU */}
          <div className="hidden lg:flex gap-8 text-white font-bold">
            <a href="#" className="hover:text-red-500">ABOUT US</a>
            <a href="#menu" className="hover:text-red-500">MENU</a>
            <a href="#" className="hover:text-red-500">PROMOTION</a>
            <a href="#" className="hover:text-red-500">CATERING ▼</a>
            <a href="#" className="hover:text-red-500">BLOG</a>
          </div>

          {/* SEARCH + CART */}
          <div className="flex gap-4 items-center">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu..."
              className="w-48 px-4 py-3 rounded bg-white text-black outline-none"
            />

            <button
              onClick={() =>
                document
                  .getElementById("cart")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-lg"
            >
              🛒 ตะกร้าของฉัน ({cart.length})
            </button>
          </div>
        </nav>

        {/* HERO TEXT */}
        <div className="relative z-10 px-12 pt-20 text-white">

          <h1 className="text-7xl md:text-8xl font-black leading-none">
            WE ARE
            <br />
            DELICIOUS
          </h1>

          <div className="mt-10 flex items-center">
            <div className="w-2 h-20 bg-red-600 mr-6"></div>

            <p className="text-2xl md:text-3xl max-w-xl">
              in Premium Ingredients & Taste
              <br />
              for everyday meals
            </p>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-lg"
          >
            ดูเมนูอาหาร
          </button>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 px-8 md:px-16">

        <div className="text-center mb-12">
          <p className="text-red-600 font-bold">OUR MENU</p>

          <h2 className="text-5xl font-black mt-2">
            เมนูยอดนิยม
          </h2>

          <p className="text-gray-500 mt-4">
            อาหารอร่อย วัตถุดิบคุณภาพ พร้อมเสิร์ฟทุกวัน
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            ไม่พบเมนูที่ค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:-translate-y-2"
              >

                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {food.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    อาหารคุณภาพ รสชาติอร่อย
                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <span className="text-2xl font-black text-red-600">
                      ฿{food.price}
                    </span>

                    <button
                      onClick={() => addToCart(food)}
                      className="bg-black text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      + เพิ่ม
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </section>

      {/* PROMOTION */}
      <section className="bg-black text-white py-20 px-8 text-center">

        <p className="text-red-500 font-bold">
          SPECIAL PROMOTION
        </p>

        <h2 className="text-5xl font-black mt-3">
          อร่อยคุ้มทุกมื้อ
        </h2>

        <p className="text-gray-300 mt-5">
          สั่งอาหารวันนี้ รับส่วนลดพิเศษทันที
        </p>

        <button className="mt-8 bg-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-700">
          สั่งอาหารเลย
        </button>

      </section>

      {/* CART */}
      <section id="cart" className="py-20 px-8 md:px-20">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl font-black mb-8">
            🛒 ตะกร้าของฉัน
          </h2>

          {cart.length === 0 ? (
            <div className="border rounded-xl p-10 text-center text-gray-500">
              ยังไม่มีสินค้าในตะกร้า
            </div>
          ) : (
            <>
              <div className="space-y-4">

                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        className="w-20 h-20 rounded-lg object-cover"
                        alt={item.name}
                      />

                      <div>
                        <h3 className="font-bold">
                          {item.name}
                        </h3>

                        <p className="text-red-600 font-bold">
                          ฿{item.price}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}

              </div>

              <div className="mt-8 text-right">

                <p className="text-2xl font-black">
                  รวมทั้งหมด: ฿
                  {cart.reduce(
                    (total, item) => total + item.price,
                    0
                  )}
                </p>

                <button
                  onClick={() => alert("ขอบคุณสำหรับการสั่งซื้อ")}
                  className="mt-5 bg-red-600 text-white px-8 py-4 rounded-lg font-bold"
                >
                  ยืนยันการสั่งซื้อ
                </button>

              </div>
            </>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-white py-10 text-center">

        <div className="text-3xl font-black">
          FOODIES<span className="text-red-600">HOP</span>
        </div>

        <p className="text-gray-400 mt-3">
          Premium Food • Premium Taste
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          © 2026 FOODIESHOP. All Rights Reserved.
        </p>

      </footer>

      {/* SOCIAL STYLE */}
      <style jsx>{`
        .social {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #e50914;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        }
      `}</style>

    </main>
  );
}
