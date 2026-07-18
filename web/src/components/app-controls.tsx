import { AboutDialog } from "./about-dialog";
import { PrivacyControl } from "./privacy-control";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

/** Header controls: about + privacy + theme picker + language picker. */
export function AppControls() {
  return (
    <div className="flex items-center gap-2">
      <AboutDialog />
      <PrivacyControl />
      <ThemeSwitcher />
      <LocaleSwitcher />
    </div>
  );
}
