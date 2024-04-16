import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import { Badge } from "./ui/badge";

interface Props {
  slot: number;
  floor: number;
  price: any;
  status: string;
  id: string;
  onClickDelete: () => void;
}

const SlotCard = (props: Props) => {
  const { slot, price, status, floor, id, onClickDelete } = props;

  const statusClass = status === "available" ? "bg-green-400" : "bg-red-400";

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex-col gap-2 space-y-2">
          <h2 className="font-semibold text-2xl">
            Floor {floor} | Slot {slot}
          </h2>
          <p className="font-semibold text-xs">Rp. {price}</p>
          <Badge
            className={`font-semibold text-xs text-zinc-700 flex-grow-0 ${statusClass}`}
          >
            {status}
          </Badge>
        </div>
        <div className="flex ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
              <Link to={`/parking-slot/${id}/edit`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onClickDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlotCard;
