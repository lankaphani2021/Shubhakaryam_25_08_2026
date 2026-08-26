import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PWAInstallPrompt = () => {
  const { showInstallPrompt, isIOS, isInstalled, handleInstallClick } = usePWAInstall();

  const handleClose = () => {
    const prompt = document.querySelector('[data-pwa-prompt]') as HTMLElement;
    if (prompt) prompt.style.display = 'none';
  };

  if (isInstalled || !showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:bottom-4 md:w-auto" data-pwa-prompt>
      <div className="rounded-xl border border-border bg-card p-4 shadow-lg md:max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
            <Download className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm text-foreground">Install Shubhakaryam App</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {isIOS 
                ? "Install our app for the best experience. Tap share and then 'Add to Home Screen'."
                : "Install our app for quick access to pooja booking and services."}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {isIOS ? (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={handleClose}
            >
              Got it
            </Button>
          ) : (
            <>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleClose}
              >
                Not now
              </Button>
              <Button 
                size="sm" 
                className="flex-1" 
                onClick={handleInstallClick}
              >
                Install
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
