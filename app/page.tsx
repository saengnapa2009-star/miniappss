import Image from "next/image";

const foods = [
  {
    name: "เบอร์เกอร์เนื้อพรีเมียม",
    price: "129 บาท",
    image: "/food/burger.jpg",
  },
  {
    name: "พิซซ่าชีสเยิ้ม",
    price: "199 บาท",
    image: "/food/pizza.jpg",
  },
  {
    name: "ซูชิญี่ปุ่น",
    price: "159 บาท",
    image: "/food/sushi.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">
        <h1 className="text-3xl font-bold text-orange-500">
          🍔 Foodie
        </h1>

        <div className="flex gap-6 text-gray-700">
          <span>หน้าแรก</span>
          <span>เมนูอาหาร</span>
          <span>โปรโมชั่น</span>
          <span>ติดต่อเรา</span>
        </div>

        <button className="bg-orange-500 text-white px-5 py-2 rounded-full">
          🛒 ตะกร้า
        </button>
      </nav>


      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center">

        <div>
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            อาหารอร่อย
            <br />
            ส่งตรงถึงบ้านคุณ
          </h2>

          <p className="mt-5 text-gray-600 text-lg">
            สั่งอาหารออนไลน์ง่าย ๆ
            สดใหม่ทุกวัน พร้อมบริการจัดส่งรวดเร็ว
          </p>

          <button className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600">
            สั่งอาหารเลย
          </button>
        </div>


        <Image
          src="/food/banner.jpg"
          alt="food banner"
          width={600}
          height={400}
          className="rounded-3xl shadow-lg"
        />

      </section>



      {/* Menu */}
      <section className="px-10 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          🍽 เมนูยอดนิยม
        </h2>


        <div className="grid md:grid-cols-3 gap-8">

          {foods.map((food,index)=>(

            <div
              key={index}
              className="bg-white rounded-3xl shadow hover:scale-105 transition p-5"
            >

              <Image
                src={food.image}
                alt={food.name}
                width={350}
                height={250}
                className="rounded-2xl w-full h-56 object-cover"
              />


              <h3 className="text-xl font-bold mt-4">
                {food.name}
              </h3>


              <p className="text-orange-500 font-bold mt-2">
                {food.price}
              </p>


              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full"
              >
                เพิ่มลงตะกร้า
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 Foodie Online Restaurant
      </footer>

    </div>
  );
}
