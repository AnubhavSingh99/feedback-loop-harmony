import { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleBellClick = () => {
    alert("Notifications clicked! (Placeholder for notifications panel or page)");
    setShowNotifications(!showNotifications);
  };

  const handleSettingsClick = () => {
    alert("Settings clicked! (Placeholder for settings panel or page)");
    setShowSettings(!showSettings);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-md">
      <div className="flex flex-1 items-center gap-2 md:gap-4">
        <h1 className="text-xl font-semibold">
          <span className="text-primary">Feedback</span> Loop Harmony
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBellClick} aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleSettingsClick} aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <ModeToggle />
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
