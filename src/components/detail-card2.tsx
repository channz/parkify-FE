import { Card, CardContent } from "./ui/card";

interface Props {
  location_name: string;
  city: string;
  floor: string;
  cover_image: string;
}

const DetailCard2 = (props: Props) => {
  const { location_name, city, floor, cover_image } = props;

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex">
          <div className="flex flex-col w-3/5">
            <div className="flex flex-col">
              <h2>{location_name}</h2>
              <p>{city}</p>
            </div>
            <div className="flex flex-col">
              <p>{floor}</p>
            </div>
          </div>
          <div className="flex w-2/5">
            <img 
            className="h-full w-auto object-cover rounded-2xl"
            src={cover_image} 
            alt={location_name} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailCard2;
