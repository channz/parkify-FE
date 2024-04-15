import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { PenSquare } from "lucide-react";

interface Props {
  id: any;
  location_name: string;
  city: string;
  cover_image: any;
}

const DetailCard3 = (props: Props) => {
  const { id, location_name, city, cover_image } = props;

  return (
    <Link to={`/parking-location/${id}/edit`}>
      <Card className="rounded-3xl">
        <CardContent className="flex p-5">
          <div className="flex flex-col w-3/5">
            <h2 className="font-semibold text-3xl leading-none text-wrap pe-4">
              {location_name}
            </h2>
            <p className="font-light text-lg mt-auto">{city}</p>
          </div>
          <div className="relative flex w-2/5">
            <div className="absolute px-2 py-2 text-white end-0 shadow-xl">
              <PenSquare
                className="hover:bg-white hover:rounded-xl hover:text-black"
                width={18}
                height={18}
              />
            </div>
            <div className="flex">
              <img
                className="h-28 w-auto object-cover rounded-2xl"
                src={cover_image}
                alt={location_name}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DetailCard3;
