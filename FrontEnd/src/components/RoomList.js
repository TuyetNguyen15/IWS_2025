// import React from "react";

// const RoomList = ({ rooms }) => {
//   if (!rooms || rooms.length === 0) {
//     return <p className="text-gray-500 italic text-center mt-10">Đang tải dữ liệu...</p>;
//   }

//   return (
//     <ul className="space-y-6 px-4">
//       {rooms.map((room) => (
//         <li
//           key={room.id}
//           className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
//         >
//           {/* Ảnh bên trái */}
//           <div className="w-full md:w-1/2 h-60">
//             {room.images?.length > 0 && (
//               <img
//                 src={`http://localhost:8080/${room.images[0].imageUrl}`}
//                 alt={`Ảnh phòng ${room.roomNumber}`}
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>

//           {/* Nội dung bên phải */}
//           <div className="w-full md:w-1/2 p-6">
//             <h3 className="text-2xl font-bold text-indigo-700 mb-2">Phòng: {room.roomNumber}</h3>
//             <p className="text-sm text-gray-600 mb-1">Loại: {room.roomType}</p>
//             <p className="text-sm mb-1">Giá: <span className="text-green-600 font-semibold">${room.roomPrice}</span></p>
//             <p className="text-sm mb-1">Diện tích: {room.roomArea} m²</p>
//             <p className="text-sm mb-1">Sức chứa: {room.roomCapacity} người</p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default RoomList;
