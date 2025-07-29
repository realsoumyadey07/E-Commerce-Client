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

interface CustomDialogbox {
  buttonName: string;
  dialogTitle: string;
  dialogDescription?: string;
  extraButton?: string;
  onClick?: () => void;
}

export default function CustomDialogbox({
  buttonName,
  dialogTitle,
  dialogDescription,
  extraButton,
  onClick,
}: CustomDialogbox) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-3 py-2 text-white text-sm hover:bg-red-700 rounded-sm font-semibold bg-red-600">
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
