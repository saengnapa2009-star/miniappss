"use client";

import { useMemo, useState } from "react";

type Food = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Food & {
  quantity: number;
};

const foods: Food[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  // =========================
  // เพิ่มสินค้า
  // =========================
  const addToCart = (food: Food) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // เพิ่มจำนวน
  // =========================
  const increaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // ลดจำนวน
  // =========================
  const decreaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // ลบสินค้า
  // =========================
  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // =========================
  // จำนวนสินค้าทั้งหมด
  // =========================
  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  // =========================
  // ราคาทั้งหมด
  // =========================
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cart]);

  // =========================
  // ค้นหา
  // =========================
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // เลื่อนไปตะกร้า
  // =========================
  const goToCart = () => {
    document
      .getElementById("cart")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =========================
  // สั่งซื้อ
  // =========================
  const checkout = () => {
    if (cart.length === 0) {
      alert("กรุณาเลือกสินค้าในตะกร้าก่อน");
      return;
    }

    alert(
      `สั่งซื้อสำเร็จ 🎉\n\nจำนวน ${totalItems} รายการ\nยอดรวม ฿${totalPrice}`
    );

    setCart([]);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ================= TOP BAR ================= */}
      <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-sm">

        <div className="flex gap-6">
          <span>✉ contact@foodieshop.com</span>
          <span>☎ +66 81 234 5678</span>
        </div>

        <div className="flex gap-3">
          <button className="social">f</button>
          <button className="social">t</button>
          <button className="social">ig</button>
          <button className="social">yt</button>
        </div>

      </div>


      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[650px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=90')",
        }}
      >

        <div className="absolute inset-0 bg-black/55"></div>


        {/* NAVBAR */}
        <nav className="relative z-10 flex flex-wrap items-center justify-between gap-5 px-8 md:px-12 py-6">

          {/* LOGO */}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="text-white text-4xl font-black tracking-wide"
          >
            FOODIES<span className="text-red-600">HOP</span>
          </button>


          {/* MENU */}
          <div className="flex gap-5 md:gap-8 text-white font-bold">

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-red-500"
            >
              ABOUT US
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-red-500"
            >
              MENU
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("promotion")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-red-500"
            >
              PROMOTION
            </button>

            <button className="hover:text-red-500">
              CATERING ▼
            </button>

            <button className="hover:text-red-500">
              BLOG
            </button>

          </div>


          {/* SEARCH + CART */}
          <div className="flex gap-3">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search menu..."
              className="w-44 md:w-52 px-4 py-3 rounded-lg bg-white text-black outline-none"
            />

            <button
              onClick={goToCart}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition text-white font-bold px-5 py-3 rounded-lg"
            >
              🛒 ตะกร้าของฉัน ({totalItems})
            </button>

          </div>

        </nav>


        {/* HERO TEXT */}
        <div className="relative z-10 px-10 md:px-20 pt-20 text-white">

          <h1 className="text-6xl md:text-8xl font-black leading-none">
            WE ARE
            <br />
            DELICIOUS
          </h1>

          <div className="mt-10 flex items-center">

            <div className="w-2 h-20 bg-red-600 mr-6"></div>

            <p className="text-xl md:text-3xl">
              in Premium Ingredients & Taste
              <br />
              for everyday meals
            </p>

          </div>

          <button
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="mt-10 bg-red-600 hover:bg-red-700 active:scale-95 transition px-8 py-4 rounded-lg font-bold text-lg"
          >
            ดูเมนูอาหาร →
          </button>

        </div>

      </section>


      {/* ================= MENU ================= */}
      <section
        id="menu"
        className="py-20 px-8 md:px-16 bg-gray-50"
      >

        <div className="text-center mb-12">

          <p className="text-red-600 font-bold">
            OUR MENU
          </p>

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
                      className="bg-black text-white px-5 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
                    >
                      🛒 เพิ่ม
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= PROMOTION ================= */}
      <section
        id="promotion"
        className="bg-black text-white py-20 px-8 text-center"
      >

        <p className="text-red-500 font-bold">
          SPECIAL PROMOTION
        </p>

        <h2 className="text-5xl font-black mt-3">
          อร่อยคุ้มทุกมื้อ
        </h2>

        <p className="text-gray-300 mt-5">
          สั่งอาหารวันนี้ รับส่วนลดพิเศษทันที
        </p>

        <button
          onClick={() =>
            document
              .getElementById("menu")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="mt-8 bg-red-600 hover:bg-red-700 active:scale-95 transition px-8 py-4 rounded-lg font-bold"
        >
          สั่งอาหารเลย
        </button>

      </section>


      {/* ================= CART ================= */}
      <section
        id="cart"
        className="py-20 px-6 md:px-20 bg-white"
      >

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl font-black mb-8">
            🛒 ตะกร้าของฉัน
          </h2>


          {cart.length === 0 ? (

            <div className="border rounded-xl p-12 text-center text-gray-500">

              <div className="text-6xl mb-5">
                🛒
              </div>

              <p className="text-xl">
                ยังไม่มีสินค้าในตะกร้า
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="mt-6 bg-black text-white px-7 py-3 rounded-lg hover:bg-red-600"
              >
                เลือกอาหาร
              </button>

            </div>

          ) : (

            <>

              {/* CART ITEMS */}
              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-red-600 font-bold">
                          ฿{item.price}
                        </p>

                      </div>

                    </div>


                    {/* QUANTITY */}
                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-xl"
                      >
                        −
                      </button>

                      <span className="w-8 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="w-10 h-10 rounded-lg bg-black text-white hover:bg-red-600 font-bold text-xl"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="ml-3 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                      >
                        🗑️
                      </button>

                    </div>


                    {/* SUBTOTAL */}
                    <div className="font-black text-lg">
                      ฿{item.price * item.quantity}
                    </div>

                  </div>

                ))}

              </div>


              {/* TOTAL */}
              <div className="mt-10 border-t pt-8 flex flex-col items-end">

                <p className="text-xl">
                  จำนวนสินค้า:{" "}
                  <b>{totalItems}</b>{" "}
                  รายการ
                </p>

                <p className="text-3xl font-black mt-2">
                  รวมทั้งหมด:{" "}
                  <span className="text-red-600">
                    ฿{totalPrice}
                  </span>
                </p>


                <button
                  onClick={checkout}
                  className="mt-6 bg-red-600 hover:bg-red-700 active:scale-95 transition text-white px-10 py-4 rounded-lg font-bold text-lg"
                >
                  ✅ ยืนยันการสั่งซื้อ
                </button>

              </div>

            </>

          )}

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-950 text-white py-10 text-center">

        <div className="text-3xl font-black">
          FOODIES<span className="text-red-600">
            HOP
          </span>
        </div>

        <p className="text-gray-400 mt-3">
          Premium Food • Premium Taste
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          © 2026 FOODIESHOP. All Rights Reserved.
        </p>

      </footer>


      {/* SOCIAL CSS */}
      <style jsx>{`

        .social {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e50914;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        .social:hover {
          transform: scale(1.15);
          background: white;
          color: red;
        }

      `}</style>

    </main>
  );
}
