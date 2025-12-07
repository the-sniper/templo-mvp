import { useToast } from '@/hooks/use-toast';

interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const useShare = () => {
  const { toast } = useToast();

  const share = async ({ title, text, url }: ShareData) => {
    const shareUrl = url || window.location.href;
    
    // Try native Web Share API first (works great on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return true;
      } catch (error) {
        // User cancelled or error - fall through to fallback
        if ((error as Error).name === 'AbortError') {
          return false;
        }
      }
    }
    
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      toast({
        title: "Link Copied!",
        description: "Share link copied to clipboard",
      });
      return true;
    } catch {
      toast({
        title: "Share Failed",
        description: "Could not share. Please copy the URL manually.",
        variant: "destructive",
      });
      return false;
    }
  };

  const shareViaWhatsApp = ({ title, text, url }: ShareData) => {
    const shareUrl = url || window.location.href;
    const message = encodeURIComponent(`${title}\n\n${text}\n\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareTemple = (templeName: string, templeId: string) => {
    const url = `${window.location.origin}/temple/${templeId}`;
    share({
      title: templeName,
      text: `Visit ${templeName} on Divine Temple Platform 🙏`,
      url,
    });
  };

  const shareTempleWhatsApp = (templeName: string, templeId: string) => {
    const url = `${window.location.origin}/temple/${templeId}`;
    shareViaWhatsApp({
      title: templeName,
      text: `🙏 Visit ${templeName} on Divine Temple Platform\n\nBook darshan, donate, and receive temple updates.`,
      url,
    });
  };

  const shareDonationReceipt = (templeName: string, amount: number, receiptId: string) => {
    share({
      title: `Donation to ${templeName}`,
      text: `🙏 I donated ₹${amount.toLocaleString()} to ${templeName}. Join me in supporting our temples!`,
      url: `${window.location.origin}/donation/receipt/${receiptId}`,
    });
  };

  const sharePoojaRequest = (templeName: string, poojaName: string, requestId: string) => {
    share({
      title: `Pooja Request - ${templeName}`,
      text: `🙏 Requested ${poojaName} at ${templeName}. Seek blessings for your family too!`,
      url: `${window.location.origin}/pooja/confirmation/${requestId}`,
    });
  };

  const shareBlessing = (priestName: string, templeName: string, message: string) => {
    share({
      title: `Blessing from ${priestName}`,
      text: `🙏 Received blessings from ${priestName} at ${templeName}:\n\n"${message}"`,
    });
  };

  return {
    share,
    shareViaWhatsApp,
    shareTemple,
    shareTempleWhatsApp,
    shareDonationReceipt,
    sharePoojaRequest,
    shareBlessing,
  };
};
