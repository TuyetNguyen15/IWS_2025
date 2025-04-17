export function getRoomImage(room){
    if(room.image && room.image.length > 0){
        return `http://localhost:8080${room.images[1].imageUrl}`;
    }else{
        return''
    }
}