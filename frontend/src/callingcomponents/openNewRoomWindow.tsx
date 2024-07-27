import { useNavigate } from "react-router-dom";

function openNewRoomWindow(room: string): void {
  const navigate = useNavigate();
  navigate(`/room/${room}`);
  //   const newWindow = window.open(`/room/${room}`, '_blank', 'width=450,height=550');
  //   if (newWindow) {
  //     newWindow.onload = () => {
  //       (newWindow as any).room = room;
  //     };
  //   } else {
  //     console.error("Failed to open new window.");
  //   }
  }
  
  export default openNewRoomWindow;
  