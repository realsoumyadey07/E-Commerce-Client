import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type LucideIcon } from "lucide-react";
import clsx from "clsx";

interface CustomDialogboxProps {
  buttonName: string;
  dialogTitle: string;
  dialogDescription?: string;
  extraButton?: string;
  onClick?: () => void;
  Icon?: LucideIcon;
  buttonClassName?: string; 
}

export default function CustomDialogbox({
  buttonName,
  dialogTitle,
  dialogDescription,
  extraButton,
  onClick,
  Icon,
  buttonClassName, // destructure here
}: CustomDialogboxProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={clsx(
          "flex items-center justify-center gap-2 px-3 py-2 text-white text-sm hover:bg-red-700 rounded-sm font-semibold bg-red-600",
          buttonClassName 
        )}
      >
        {Icon && <Icon size={18} />}
        {buttonName}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {dialogDescription ? dialogDescription : null}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green-500 hover:bg-green-600 text-white hover:text-white">
            Cancel
          </AlertDialogCancel>
          {extraButton && onClick && (
            <AlertDialogAction
              onClick={onClick}
              className="bg-red-600 hover:bg-red-700"
            >
              {extraButton}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
