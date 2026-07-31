// "use client";
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useCartStore } from "@/store/cartStore";
// import { useLikedStore } from "@/store/likedStore";

// const NewProducts = () => {
//   const [getId, setGetId] = useState("");
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await fetch(
//         "https://api.escuelajs.co/api/v1/products?limit=100&offset=0",
//       );
//       return res.json();
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Something went wrong</p>;

//   return (
//     <div>
//       <div className="w-full pt-16 px-[43px]">
//         <h2 className="font-medium text-2xl pb-4">New Products</h2>

//         <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
//           {data.map((product: any) => (
//             <div key={product.id} className="px-4 border border-gray-200 rounded-xl max-w-[220px] max-h-[600px]">
//               <div onClick={() => setGetId(product.id)}>
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 width={200}
//                 height={300}
//               ></img>
//               </div>
//               <div className="space-y-2 py-2">
//                 <h2 className="text-[#ff8f9c] font-medium uppercase">{product.title}</h2>
//                 <p className="text-gray-500 max-w-[150px]">{(product.description).slice(0,45) + "..."}</p>
//                 <div className="font-bold flex gap-4">
//                   ${product.price}
//                   <del className="text-gray-500 font-normal">${parseInt(product.price) + 50}.00</del>
//                 </div>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewProducts;

"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/store/cartStore";
import { useLikedStore } from "@/store/likedStore";
import { useSearchStore } from "@/store/searchStore";


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const NewProducts = () => {
  const [getId, setGetId] = useState<number | null>(null);
  const {searchText} = useSearchStore();
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.escuelajs.co/api/v1/products?limit=100&offset=0",
      );
      return res.json();
    },
  });

  const { addToCart } = useCartStore();
  const { toggleLike, isLiked } = useLikedStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!data) return null;

  const filteredData = searchText.trim()
    ? data.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase()),
      )
    : data;
  // Look up the currently selected product fresh from data + getId.
  const currentIndex = data.findIndex((p) => p.id === getId);
  const selectedProduct = currentIndex !== -1 ? data[currentIndex] : null;

  const closeModal = () => setGetId(null);

  const goPrev = () => {
    if (currentIndex > 0) {
      setGetId(data[currentIndex - 1].id);
    }
  };

  const goNext = () => {
    if (currentIndex < data.length - 1) {
      setGetId(data[currentIndex + 1].id);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] ?? "",
    });
  };

  const handleToggleLike = (product: Product) => {
    toggleLike({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] ?? "",
    });
  };

  return (
    <div>
      <div className="w-full pt-16 px-[43px]">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>

        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {filteredData.map((product) => (
            <div
              key={product.id}
              onClick={() => setGetId(product.id)}
              className="px-4 border border-gray-200 rounded-xl max-w-[220px] max-h-[600px] cursor-pointer hover:shadow-md transition-shadow"
            >
              <div>
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  width={200}
                  height={300}
                />
              </div>
              <div className="space-y-2 py-2">
                <h2 className="text-[#ff8f9c] font-medium uppercase">
                  {product.title}
                </h2>
                <p className="text-gray-500 max-w-[150px]">
                  {product.description.slice(0, 45) + "..."}
                </p>
                <div className="font-bold flex gap-4">
                  ${product.price}
                  <del className="text-gray-500 font-normal">
                    ${product.price + 50}.00
                  </del>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-6 relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="text-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous product"
              >
                ←
              </button>

              <img
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.title}
                width={220}
                height={300}
                className="rounded-lg mx-4"
              />

              <button
                onClick={goNext}
                disabled={currentIndex === data.length - 1}
                className="text-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next product"
              >
                →
              </button>
            </div>

            <h2 className="text-[#ff8f9c] font-medium uppercase text-lg">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-600 my-2">{selectedProduct.description}</p>

            <div className="font-bold flex gap-4 mb-4">
              ${selectedProduct.price}
              <del className="text-gray-500 font-normal">
                ${selectedProduct.price + 50}.00
              </del>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="flex-1 bg-[#ff8f9c] text-white rounded-lg py-2 font-medium hover:bg-red-500 hover:cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleToggleLike(selectedProduct)}
                className="px-4 border rounded-lg text-xl hover:cursor-pointer"
                aria-label="Like product"
              >
                {isLiked(selectedProduct.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
