create database iws_final;
use iws_final;
select * from room;
INSERT INTO `room` (`id`, `number`, `type`, `price`, `status`, `description`, `area`, `capacity`, `amenities`) VALUES
                                                                                                                   (1, '101', 'Couple Simple Room', 60.00, 'Available','A cozy room for couples.', 25.5, 2, 'WiFi, TV'),
                                                                                                                   (2, '102', 'Deluxe Room', 80.00, 'Booked', 'A luxurious deluxe room.', 30.0, 2, 'WiFi, Mini Bar'),
                                                                                                                   (3, '103', 'Family Room', 100.00, 'Booked', 'Spacious room for families.', 40.0, 4, 'WiFi, TV, Balcony');

INSERT INTO room_image (room_id, image_url)
VALUES
    (1, 'assets/images/rooms/Standard Room/standard01.jpg'),
    (1, 'assets/images/rooms/Couple Simple Room/coupleBack.jpg'),
    (1, 'assets/images/rooms/Standard Room/standardBack.jpg'),
    (1, 'assets/images/rooms/Standard Room/standardFront.jpg'),
    (1, 'assets/images/rooms/Standard Room/standardLeft.jpg'),
    (1, 'assets/images/rooms/Standard Room/standardRight.jpg'),
    (2, 'assets/images/rooms/Deluxe Room/deluxe01.jpg'),
    (2, 'assets/images/rooms/Deluxe Room/deluxeBack.jpg'),
    (2, 'assets/images/rooms/Deluxe Room/deluxeFront.jpg'),
    (2, 'assets/images/rooms/Deluxe Room/deluxeLeft.jpg'),
    (2, 'assets/images/rooms/Deluxe Room/deluxeRight.jpg'),
    (3, 'assets/images/rooms/Family Room/family01.jpg'),
    (3, 'assets/images/rooms/Family Room/familyBack.jpg'),
    (3, 'assets/images/rooms/Family Room/familyFront.jpg'),
    (3, 'assets/images/rooms/Family Room/familyLeft.jpg'),
    (3, 'assets/images/rooms/Family Room/familyRight.jpg');
