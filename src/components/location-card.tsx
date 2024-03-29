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
    <Link to={`/${id}`}>
      <Card>
        <CardContent>
          <div className="flex">
            <div className="flex flex-col">
              <h2>{location_name}</h2>
              <p>{city}</p>
              <Badge>{space}</Badge>
            </div>
            <div className="flex flex-col">
              <img
                className="aspect-[1/2] h-auto w-auto object-cover"
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

export default LocationCard;
