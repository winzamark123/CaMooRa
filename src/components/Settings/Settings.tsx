import { trpc } from '@/lib/trpc/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Settings() {
  const { mutate: deleteUser } = trpc.user.deleteUser.useMutation();

  return (
    <Dialog>
      <DialogTrigger>Settings</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        {/* Add your settings content here */}
        <div className="flex justify-between">
          <Button onClick={() => deleteUser()}>Delete Account</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
