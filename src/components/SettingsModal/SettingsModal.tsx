import { trpc } from '@/lib/trpc/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../Theme/mode-toggle';
import { Settings } from 'lucide-react';

export default function SettingsModal() {
  const { mutate: deleteUser } = trpc.user.deleteUser.useMutation();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        {/* Add your settings content here */}
        <div className="flex justify-between">
          <ModeToggle />
          <Button
            className="bg-rose-500 hover:bg-rose-600"
            onClick={() => deleteUser()}
          >
            Delete Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
