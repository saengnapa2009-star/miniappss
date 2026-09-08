import Image from "next/image";
import { useMemo, useState } from "react";

type Food = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  popular?: boolean;
};

const foods: Food[] = [
  {
    id: 1,
    name: "เบอร์เกอร์เนื้อพรีเมียม",
    category: "เบอร์เกอร์",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    description: "เนื้อวัวฉ่ำ ๆ ชีส ผักสด และซอสสูตรพิเศษ",
    popular: true,
  },
  {
    id: 2,
    name: "พิซซ่าชีส",
    category: "พิซซ่า",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop",
    description: "ชีสแน่น ๆ แป้งกรอบนอกนุ่มใน",
    popular: true,
  },
  {
    id: 3,
    name: "ซูชิแซลมอน",
    category: "ญี่ปุ่น",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    description: "แซลมอนสด เสิร์ฟพร้อมข้าวญี่ปุ่น",
    popular: true,
  },
  {
    id: 4,
    name: "ไก่ทอดกรอบ",
    category: "ของทอด",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1000&auto=format&fit=crop",
    description: "ไก่ทอดกรอบ หอมเครื่องเทศ",
  },
  {
    id: 5,
    name: "พาสต้าไวท์ซอส",
    category: "พาสต้า",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000&auto=format&fit=crop",
    description: "พาสต้าเส้นนุ่ม ซอสครีมเข้มข้น",
  },
  {
    id: 6,
    name: "สเต๊กเนื้อ",
    category: "สเต๊ก",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    description: "สเต๊กเนื้อนุ่ม เสิร์ฟพร้อมผักและมันฝรั่ง",
    popular: true,
  },
  {
    id: 7,
    name: "สลัดผักเพื่อสุขภาพ",
    category: "สุขภาพ",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
    description: "ผักสดหลากชนิด พร้อมน้ำสลัดสูตรพิเศษ",
  },
  {
    id: 8,
    name: "ชาเขียวเย็น",
    category: "เครื่องดื่ม",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
    description: "ชาเขียวหอม ๆ หวานกำลังดี",
  },
];

const categories = [
  "ทั้งหมด",
  "เบอร์เกอร์",
  "พิซซ่า",
  "ญี่ปุ่น",
  "ของทอด",
  "พาสต้า",
  "สเต๊ก",
  "สุขภาพ",
  "เครื่องดื่ม",
];

export default function Home() {
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchCategory =
        category === "ทั้งหมด" || food.category === category;

      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const cartItems = foods.filter((food) => cart.includes(food.id));

  const getQuantity = (id: number) =>
    cart.filter((item) => item === id).length;

  const addToCart = (id: number) => {
    setCart((current) => [...current, id]);
  };

  const removeFromCart = (id: number) => {
    setCart((current) => {
      const index = current.indexOf(id);

      if (index === -1) return current;

      const copy = [...current];
      copy.splice(index, 1);
      return copy;
    });
  };

  const removeAll = (id: number) => {
    setCart((current) => current.filter((item) => item !== id));
  };

  const totalPrice = cart.reduce((total, id) => {
    const food = foods.find((item) => item.id === id);
    return total + (food?.price ?? 0);
  }, 0);

  const totalItems = cart.length;

  return (
    <main className="min-h-screen bg-[#fffaf5] text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow">
              🍔
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                Foodie
              </h1>
              <p className="text-xs text-gray-500">
                อร่อยทุกมื้อ ส่งตรงถึงคุณ
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-medium text-orange-500">
              หน้าแรก
            </a>
            <a href="#menu" className="font-medium hover:text-orange-500">
              เมนูอาหาร
            </a>
            <a href="#popular" className="font-medium hover:text-orange-500">
              ยอดนิยม
            </a>
            <a href="#contact" className="font-medium hover:text-orange-500">
              ติดต่อเรา
            </a>
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
          >
            🛒 ตะกร้า

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:py-20">
        <div className="grid items-center gap-10 rounded-[32px] bg-orange-100 px-7 py-10 md:px-12 lg:grid-cols-2 lg:py-14">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-500 shadow-sm">
              🔥 โปรโมชั่นพิเศษวันนี้
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              อาหารอร่อย
              <br />
              <span className="text-orange-500">ส่งตรงถึงบ้าน</span>
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
              สั่งอาหารจานโปรดของคุณได้ง่าย ๆ
              พร้อมบริการจัดส่งรวดเร็วและรสชาติอร่อยเหมือนทานที่ร้าน
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#menu"
                className="rounded-full bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              >
                🍽 ดูเมนูอาหาร
              </a>

              <button
                onClick={() => setCartOpen(true)}
                className="rounded-full border border-orange-200 bg-white px-7 py-3.5 font-bold text-gray-700 transition hover:bg-orange-50"
              >
                🛒 ดูตะกร้า
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <span>⭐ 4.9/5 คะแนน</span>
              <span>🚀 ส่งไว 20-30 นาที</span>
              <span>💳 ชำระเงินง่าย</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px]">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
              alt="อาหารหลากหลาย"
              width={1200}
              height={800}
              priority
              className="h-[340px] w-full object-cover md:h-[450px]"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-4 shadow-xl">
              <p className="text-xs text-gray-500">อาหารยอดนิยม</p>
              <p className="font-extrabold text-gray-900">
                เบอร์เกอร์เนื้อพรีเมียม
              </p>
              <p className="mt-1 font-bold text-orange-500">129 บาท</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold">เลือกประเภทอาหาร</h2>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-3 font-semibold transition ${
                category === item
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 shadow-sm hover:bg-orange-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH */}
      <section className="mx-auto max-w-7xl px-5 pt-8">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาเมนูอาหาร..."
            className="w-full rounded-2xl border border-orange-100 bg-white px-14 py-4 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </section>

      {/* POPULAR */}
      <section id="popular" className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-bold text-orange-500">CUSTOMER FAVORITE</p>
            <h2 className="mt-1 text-3xl font-black">🔥 เมนูยอดนิยม</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods
            .filter((food) => food.popular)
            .map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                quantity={getQuantity(food.id)}
                onAdd={() => addToCart(food.id)}
                onRemove={() => removeFromCart(food.id)}
              />
            ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-7xl px-5 pb-20">
        <div>
          <p className="font-bold text-orange-500">OUR MENU</p>
          <h2 className="mt-1 text-3xl font-black">🍽 เมนูอาหารทั้งหมด</h2>
        </div>

        {filteredFoods.length > 0 ? (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                quantity={getQuantity(food.id)}
                onAdd={() => addToCart(food.id)}
                onRemove={() => removeFromCart(food.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">😢</div>
            <h3 className="mt-4 text-xl font-bold">
              ไม่พบเมนูที่ค้นหา
            </h3>
            <p className="mt-2 text-gray-500">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        )}
      </section>

      {/* PROMOTION */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="overflow-hidden rounded-[32px] bg-gray-900 px-7 py-10 text-white md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold">
                🎉 โปรพิเศษ
              </span>

              <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                สั่งครบ 500 บาท
                <br />
                <span className="text-orange-400">
                  ส่งฟรีทันที!
                </span>
              </h2>

              <p className="mt-4 text-gray-300">
                ใช้บริการ Foodie วันนี้
                พร้อมรับโปรโมชั่นสุดคุ้มสำหรับทุกออเดอร์
              </p>
            </div>

            <div className="text-center md:text-right">
              <div className="text-7xl">🚴</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-950 px-5 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-2xl">
                🍔
              </div>

              <h3 className="text-2xl font-black">Foodie</h3>
            </div>

            <p className="mt-4 max-w-sm text-gray-400">
              ร้านอาหารออนไลน์สำหรับคนที่รักการกิน
              อร่อยง่าย สั่งง่าย ส่งตรงถึงบ้าน
            </p>
          </div>

          <div>
            <h4 className="font-bold">เมนู</h4>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>หน้าแรก</p>
              <p>เมนูอาหาร</p>
              <p>โปรโมชั่น</p>
              <p>ติดต่อเรา</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold">ติดต่อ</h4>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>📞 099-999-9999</p>
              <p>📧 foodie@example.com</p>
              <p>📍 กรุงเทพฯ ประเทศไทย</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 Foodie Online Restaurant. All Rights Reserved.
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">🛒 ตะกร้าของคุณ</h2>
                <p className="text-sm text-gray-500">
                  {totalItems} รายการ
                </p>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <div className="text-7xl">🛒</div>
                <h3 className="mt-5 text-xl font-bold">
                  ยังไม่มีสินค้าในตะกร้า
                </h3>
                <p className="mt-2 text-gray-500">
                  เลือกเมนูที่คุณชอบแล้วเพิ่มลงตะกร้าได้เลย
                </p>

                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-bold text-white"
                >
                  เลือกอาหาร
                </button>
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-4">
                  {cartItems.map((food) => {
                    const quantity = getQuantity(food.id);

                    return (
                      <div
                        key={food.id}
                        className="flex gap-4 rounded-2xl border border-gray-100 p-3"
                      >
                        <Image
                          src={food.image}
                          alt={food.name}
                          width={90}
                          height={90}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-bold">{food.name}</h3>
                            <p className="text-sm text-orange-500">
                              {food.price.toLocaleString()} บาท
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeFromCart(food.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                              >
                                −
                              </button>

                              <span className="w-5 text-center font-bold">
                                {quantity}
                              </span>

                              <button
                                onClick={() => addToCart(food.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeAll(food.id)}
                              className="text-xs font-medium text-red-500"
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between text-gray-500">
                    <span>รวมสินค้า</span>
                    <span>{totalPrice.toLocaleString()} บาท</span>
                  </div>

                  <div className="mt-3 flex justify-between text-lg font-black">
                    <span>ยอดรวม</span>
                    <span className="text-orange-500">
                      {totalPrice.toLocaleString()} บาท
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      alert(
                        `ขอบคุณสำหรับการสั่งซื้อ ยอดรวม ${totalPrice.toLocaleString()} บาท`
                      )
                    }
                    className="mt-6 w-full rounded-2xl bg-orange-500 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                  >
                    ✅ ดำเนินการสั่งซื้อ
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function FoodCard({
  food,
  quantity,
  onAdd,
  onRemove,
}: {
  food: Food;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Image
          src={food.image}
          alt={food.name}
          width={700}
          height={500}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {food.popular && (
          <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow">
            🔥 ยอดนิยม
          </span>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-700 shadow">
          {food.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-extrabold">{food.name}</h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
          {food.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-orange-500">
              {food.price.toLocaleString()}
              <span className="ml-1 text-sm">บาท</span>
            </p>
          </div>

          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              + เพิ่ม
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-orange-50 p-1">
              <button
                onClick={onRemove}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-orange-500 shadow-sm"
              >
                −
              </button>

              <span className="w-6 text-center font-bold">{quantity}</span>

              <button
                onClick={onAdd}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
