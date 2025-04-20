==============  🏨 Hotel Booking System - SpringBoot & React  =============

🛠️ Tech Stack
- Backend: Spring Boot (Java 17+)
- Frontend: React 
- Database: MySQL
- Authentication: JWT with Spring Security
- API Docs: Swagger UI
- Styling: Tailwind CSS


📌 System Features
1. Sign in
2. Sign up
3. Home Page (about us + some highlight rooms) 
4. Browse Page (with pagination)
5. Search Filter (check-in, check-out, room type)
6. Manage Room (Add/Edit/Delete/Search room) for Admin
7. Manage Booking (Edit/Delete/Search customer's confirmed booking and Accept/Decline customer's pending booking) for Admin
8. My Booking (list of booking detail + button Cancel Booking for pending booking and button Delete for cancelled/failed booking) for Customer
9. Room Detail Page (both Admin and Customer can access/view)
10. Booking Form (link from Room Detail Page when Customer clicks on Booking Now) for Customer fills in information to book room
11. Admin Profile (Edit information)
12. Customer Profile (Edit information)
13. Logout



📌📌 API Endpoints Assignment

👤 Person 1: Authentication & Profile Management
1. POST    /api/auth/signin               ------- (UC1)
2. POST    /api/auth/signup               ------- (UC2)
3. POST    /api/auth/logout               ------- (UC13)
4. GET     /api/admin/profile             ------- (UC11 - View profile admin)
5. PUT     /api/admin/profile             ------- (UC11 - Update profile admin)
6. GET     /api/customer/profile          ------- (UC12 - View profile customer)
7. PUT     /api/customer/profile          ------- (UC12 - Update profile customer)


👤 Person 2: Room Management
1. GET     /api/home                    ------- (UC3 - Get a list of outstanding rooms)
2. GET     /api/rooms                               ------- (UC4,5 - Filter Room + Pagination)
3. GET     /api/rooms/{roomId}                      ------- (UC9 - Room Detail)
4. GET     /api/admin/rooms                         ------- (UC6 - Search room for Admin)
5. POST    /api/admin/rooms                         ------- (UC6 - Add Room)
6. PUT     /api/admin/rooms/{roomId}                ------- (UC6 - Edit Room)
7. DELETE  /api/admin/rooms/{roomId}                ------- (UC6 - Delete Room)


👤 Person 3: Booking Management
1. POST    /api/bookings                                                    ------- (UC10 - Make Booking for customer)
2. GET     /api/admin/bookings                                              ------- (UC7 - Search Booking for admin)
3. PUT     /api/admin/bookings/{bookingId}                                  ------- (UC7 - Edit Booking for admin)
4. PUT     /api/admin/bookings/{bookingId}/status                           ------- (UC7 - Accept/Decline Booking for admin)
5. DELETE  /api/admin/bookings/{bookingId}                                  ------- (UC7 - Delete Booking for admin)
6. GET     /api/customer/bookings                                           ------- (UC8 - Booking List of customer)
7. PUT     /api/customer/bookings/{bookingId}/cancel                        ------- (UC8 - Cancel Booking for customer)
8. DELETE  /api/customer/bookings/{bookingId}                               ------- (UC8 - Delete booking for customer)
