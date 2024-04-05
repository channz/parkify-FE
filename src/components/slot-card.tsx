import { deleteParkingSlot } from "@/utils/apis/slot/api";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

interface Props {
  slot: number;
  price: number;
}

const SlotCard = (props: Props) => {
  const { slot, price } = props;

  async function handleDelete(parkingslotID: string) {
    try {
      const result = await deleteParkingSlot(parkingslotID);
      toast(result?.message);
      localStorage.removeItem("token");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex">
          <div className="flex flex-col w-3/5">
            <div className="flex flex-col">
              <h2>{slot}</h2>
              <p>{price}</p>
            </div>
          </div>
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(parkingslotID)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlotCard;
