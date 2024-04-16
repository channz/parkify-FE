import { Card, CardContent } from "./ui/card";

interface Props {
  location_name: string;
  city: string;
  floor: string;
  slot: number;
  cover_image: string;
}

const DetailCard2 = (props: Props) => {
  const { location_name, city, floor, slot, cover_image } = props;

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex">
          <div className="flex flex-col w-3/5">
            <div className="flex flex-col">
              <h2 className="font-semibold text-base">{location_name}</h2>
              <p className="font-light text-xs">{city}</p>
            </div>
            <div className="flex flex-col mt-auto">
              <p className="font-semibold text-xl">Slot {slot}</p>
              <p className="font-light text-xs">Floor, {floor}</p>
            </div>
          </div>
          <div className="flex w-2/5">
            <img
              className="h-full w-auto object-cover rounded-2xl"
              src={cover_image}
              alt={location_name}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailCard2;
