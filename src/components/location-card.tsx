import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface Props {
  location_name: string;
  cover_image: string;
  city: string;
  space: string;
  id: number;
}

const LocationCard = (props: Props) => {
  const { location_name, cover_image, city, space, id } = props;

  return (
    // <Link to={`${id}`}>
    <Card>
      <CardContent className="flex p-4">
        <div className="flex flex-col w-3/5">
          <h2 className="font-semibold text-lg">{location_name}</h2>
          <p className="font-light text-sm">{city}</p>
          <Badge className="w-fit mt-auto bg-green-300">{space}</Badge>
        </div>
        <div className="flex w-2/5">
          <img
            className="h-24 w-auto object-cover rounded-2xl"
            src={cover_image}
            alt={location_name}
          />
        </div>
      </CardContent>
    </Card>
    // </Link>
  );
};

export default LocationCard;