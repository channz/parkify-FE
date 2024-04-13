import { deleteParkingSlot } from "@/utils/apis/slot/api";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Props {
  slot: number;
  price: number;
}

const SlotCard = (props: Props) => {
  const { slot, price } = props;
  const [first, setfirst] = useState();

  const params = useParams();

  async function handleDelete() {
    try {
      console.log("tes");
      const result = await deleteParkingSlot(params.parkingslotID!);
      toast(result?.message);
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
                <DropdownMenuItem
                  onClick={() => handleDelete(params.parkingslotID!)}
                >
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
