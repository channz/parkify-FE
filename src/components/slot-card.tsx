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
  price: any;
  status: string;
  id: string;
  onClickDelete: () => void;
}

const SlotCard = (props: Props) => {
  const { slot, price, status, id, onClickDelete } = props;

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">{slot}</h2>
          <p className="font-semibold text-xs">Rp. {price}</p>
          <Badge className="font-semibold text-xs">{status}</Badge>
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
