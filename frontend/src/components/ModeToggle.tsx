import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

export default function ModeToggle({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (mode: string) => void;
}) {
  return (
    <div
      className="toggle"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
          document.querySelector("body")?.classList.remove("light");
          document.querySelector("body")?.classList.add("dark");
        } else {
          setMode("light");
          document.querySelector("body")?.classList.remove("dark");
          document.querySelector("body")?.classList.add("light");
        }
      }}
    >
      {mode === "light" ? <MoonIcon /> : <SunIcon />}
    </div>
  );
}
