import { useState } from 'react';
import { MessageCircle, X, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { trackEvent } from '@/utils/analytics';

interface FamilyConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  templeName: string;
  templeLocation: string;
  onConfirm: () => void;
}

const FamilyConfirmationModal = ({
  isOpen,
  onClose,
  templeName,
  templeLocation,
  onConfirm,
}: FamilyConfirmationModalProps) => {
  const [shared, setShared] = useState(false);

  const generateWhatsAppMessage = () => {
    const message = `Templo found our possible Kuladeivam temple:\n\n${templeName}\n${templeLocation}\n\nIs this correct? Please reply:\nYes\nNo\nNot sure\n\nFind your ancestral temple: ${window.location.origin}/ancestral`;

    return encodeURIComponent(message);
  };

  const handleShareWhatsApp = () => {
    trackEvent('ancestral_whatsapp_share', {
      templeName,
      templeLocation,
    });
    
    const whatsappUrl = `https://wa.me/?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');
    setShared(true);
  };

  const handleSkip = () => {
    trackEvent('ancestral_skip_share', {
      templeName,
    });
    onConfirm();
    onClose();
  };

  const handleContinue = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center font-serif text-xl">
            Confirm with Your Family
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            Send this to your parents or elders to confirm your Kuladeivam temple.
          </p>

          {/* Temple Card Preview */}
          <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
            <p className="font-semibold text-foreground">{templeName}</p>
            <p className="text-sm text-muted-foreground">{templeLocation}</p>
          </div>

          {shared ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <span className="font-medium">Message ready to send!</span>
              </div>
              <Button 
                onClick={handleContinue}
                className="w-full h-12 rounded-full gap-2"
              >
                Continue to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                onClick={handleShareWhatsApp}
                className="w-full h-12 rounded-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
              >
                <MessageCircle className="h-5 w-5" />
                Share on WhatsApp
              </Button>
              
              <Button 
                onClick={handleSkip}
                variant="ghost"
                className="w-full text-muted-foreground"
              >
                Skip for now
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground">
            Family confirmation helps us verify ancestral temple records
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyConfirmationModal;
