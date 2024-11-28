import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ExhibitionDropdownProps {
  dropdownText: string;
  setDropdownText: (value: string) => void;
  otherOption: string;
}

export function ExhibitionDropdown({
  dropdownText,
  setDropdownText,
  otherOption,
}: ExhibitionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {dropdownText}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDropdownText(otherOption)}>
          {otherOption}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
