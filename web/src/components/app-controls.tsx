import { AboutDialog } from "./about-dialog";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

/** Header controls: about + theme picker + language picker, used on every page. */
export function AppControls() {
  return (
    <div className="flex items-center gap-2">
      <AboutDialog />
      <ThemeSwitcher />
      <LocaleSwitcher />
    </div>
  );
}
