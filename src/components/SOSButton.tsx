
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TbSos } from "react-icons/tb";

export default function SOSButton() {

  const callPolice = () => {
    window.location.href = "tel:999";
  };

  const notifyContact = () => {
    alert("Emergency contact notified!");
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        alert(`Location shared: ${mapsLink}`);
      });
    } else {
      alert("Geolocation not supported!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-6 right-6 z-50 bg-red-600 text-muted p-4 rounded-full shadow-lg hover:bg-red-700 transition">
          <TbSos className="text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">
            Emergency SOS
          </DialogTitle>
          <DialogDescription className="">
            Choose an emergency action
          </DialogDescription>
        </DialogHeader>
        <Button onClick={callPolice}> Call Police</Button>
        <Button onClick={notifyContact}> Notify Contact</Button>
        <Button onClick={shareLocation}> Share Live Location</Button>
      </DialogContent>
    </Dialog>
  )
}
